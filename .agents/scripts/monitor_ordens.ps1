param(
    [string]$SyncPath = "G:\Meu Drive\Antigravity_Sync",
    [switch]$Once
)

$ErrorActionPreference = "Continue"

$logFile = "C:\Users\Alexandre\masterkey-frontend\.agents\scripts\monitor.log"

function Write-Log {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $entry = "[$timestamp] $Message"
    try {
        [System.IO.File]::AppendAllText($logFile, "$entry`r`n", [System.Text.Encoding]::UTF8)
    } catch {}
    Write-Host $entry
}

if (-not (Test-Path $SyncPath)) {
    Write-Log "[ERRO] Caminho de sincronização não encontrado: $SyncPath"
    exit 1
}

# Single-instance check (evita duplicidade de processos em segundo plano)
if (-not $Once) {
    $currentPid = $PID
    $existingProcesses = Get-CimInstance Win32_Process | Where-Object { 
        $_.CommandLine -like "*monitor_ordens.ps1*" -and $_.ProcessId -ne $currentPid 
    }
    if ($existingProcesses) {
        Write-Log "[INFO] Instância anterior de monitor_ordens detectada (PID $($existingProcesses.ProcessId -join ', ')). Encerrando processo antigo para atualizar..."
        foreach ($proc in $existingProcesses) {
            Stop-Process -Id $proc.ProcessId -Force -ErrorAction SilentlyContinue
        }
    }
}

function Show-Notification {
    param(
        [string]$Title,
        [string]$Message
    )
    try {
        $wsh = New-Object -ComObject Wscript.Shell
        $wsh.Popup($Message, 5, $Title, 64) | Out-Null
    } catch {
        # Fallback silencioso
    }
}

$script:lastProcessedOrderId = ""
$script:lastAlertTime = [DateTime]::MinValue

function Check-PendingOrders {
    $targetFiles = @(
        (Join-Path $SyncPath "ORDENS_DO_GEMINI.json"),
        (Join-Path $SyncPath "ORDENS_DO_GEMINI.md")
    )

    foreach ($file in $targetFiles) {
        if (-not (Test-Path $file)) {
            continue
        }

        # Ignora arquivos de link do google drive (.gdoc)
        if ($file.EndsWith(".gdoc")) {
            continue
        }

        try {
            $content = $null
            for ($i = 0; $i -lt 3; $i++) {
                try {
                    $content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
                    break
                } catch {
                    Start-Sleep -Milliseconds 200
                }
            }

            if (-not [string]::IsNullOrWhiteSpace($content)) {
                $isPendente = ($content -match 'status":\s*"pendente') -or ($content -match 'status:\s*pendente')
                
                if ($isPendente) {
                    # Extrai ID da ordem se existir
                    $orderId = "ORD-DESCONHECIDA"
                    if ($content -match '(?:id_ordem"?\s*:\s*"?)(ORD-[A-Za-z0-9_-]+)') {
                        $orderId = $matches[1]
                    }

                    $now = Get-Date
                    # Dispara alerta se for nova ordem ou se passaram mais de 60 segundos do último alerta
                    if ($orderId -ne $script:lastProcessedOrderId -or (($now - $script:lastAlertTime).TotalSeconds -ge 60)) {
                        $script:lastProcessedOrderId = $orderId
                        $script:lastAlertTime = $now

                        Write-Log "🔔 NOVA ORDEM DO GEMINI DETECTADA! ID: $orderId no arquivo $([System.IO.Path]::GetFileName($file))"

                        # Alerta sonoro no Windows
                        try {
                            [console]::beep(800, 300)
                            [console]::beep(1000, 400)
                        } catch {}

                        # Alerta visual no terminal
                        Write-Host "`n============================================================" -ForegroundColor Yellow
                        Write-Host "🔔 NOVA ORDEM DO GEMINI RECEBIDA! (ID: $orderId)" -ForegroundColor Red -BackgroundColor Yellow
                        Write-Host "============================================================" -ForegroundColor Yellow
                        Write-Host "Arquivo: $file" -ForegroundColor Cyan
                        Write-Host "`n--- CONTEÚDO DA ORDEM ---" -ForegroundColor White
                        Write-Host $content -ForegroundColor Green
                        Write-Host "------------------------------------------------------------`n" -ForegroundColor Yellow

                        # Pop-up no desktop
                        Show-Notification -Title "Antigravity Bridge - Gemini Cloud" -Message "🔔 NOVA ORDEM DO GEMINI RECEBIDA ($orderId)! Verifique o Antigravity."

                        return $true
                    }
                }
            }
        } catch {
            Write-Log "[AVISO] Falha ao inspecionar $file - $($_.Exception.Message)"
        }
    }

    return $false
}

Write-Log "🚀 SERVIÇO MONITOR DE ORDENS DO GEMINI INICIADO"
Write-Log "Pasta monitorada: $SyncPath (Alvos: ORDENS_DO_GEMINI.json, ORDENS_DO_GEMINI.md)"

if ($Once) {
    $found = Check-PendingOrders
    if (-not $found) {
        Write-Log "Status: Nenhuma ordem pendente encontrada (Modo -Once concluído)."
    }
    exit 0
}

# FileSystemWatcher para mudanças imediatas
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $SyncPath
$watcher.Filter = "*ORDENS*"
$watcher.IncludeSubdirectories = $false
$watcher.EnableRaisingEvents = $true

$action = {
    $now = Get-Date
    if (($now - $script:lastAlertTime).TotalSeconds -ge 2) {
        Check-PendingOrders | Out-Null
    }
}

$createdEvent = Register-ObjectEvent $watcher "Created" -Action $action
$changedEvent = Register-ObjectEvent $watcher "Changed" -Action $action

try {
    while ($true) {
        # Loop de verificação periódica a cada 5 segundos (garantia de sincronização em nuvem)
        Start-Sleep -Seconds 5
        Check-PendingOrders | Out-Null
    }
} finally {
    Unregister-Event -SourceIdentifier $createdEvent.Name -ErrorAction SilentlyContinue
    Unregister-Event -SourceIdentifier $changedEvent.Name -ErrorAction SilentlyContinue
    $watcher.Dispose()
    Write-Log "[INFO] Serviço de monitoramento encerrado."
}
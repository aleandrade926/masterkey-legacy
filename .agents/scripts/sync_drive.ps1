param(
    [string]$Project = "Masterkey Frontend / Ecossistema ToDeAcordo & TaxManagers",
    [string]$LastAction = "Sincronização de status e changelog",
    [string]$BuildStatus = "Produção Vercel Estável",
    [string]$Errors = "Nenhum erro crítico pendente",
    [string]$AwaitingHumanDecision = "Não",
    [string]$NextStep = ""
)

$syncFolder = "G:\Meu Drive\Antigravity_Sync"
if (-not (Test-Path $syncFolder)) {
    New-Item -ItemType Directory -Path $syncFolder -Force | Out-Null
}

$changelogLocal = "C:\Users\Alexandre\masterkey-frontend\.agents\GLOBAL_CHANGELOG.md"
if (Test-Path $changelogLocal) {
    Copy-Item -Path $changelogLocal -Destination "$syncFolder\GLOBAL_CHANGELOG.md" -Force
}

$now = Get-Date -Format "dd/MM/yyyy HH:mm:ss"
$statusMd = @"
# STATUS ATUAL DO ECOSSISTEMA & AGENTE ANTIGRAVITY

- **Data / Hora da Última Atualização:** $now
- **Projeto Ativo:** $Project
- **Última Ação Executada:** $LastAction
- **Status de Build / Deploy:** $BuildStatus
- **Erros / Alertas Pendentes:** $Errors
- **Aguardando Decisão Humana:** $AwaitingHumanDecision
- **Próximo Passo:** $NextStep
"@

$statusLocal = "C:\Users\Alexandre\masterkey-frontend\.agents\STATUS_ATUAL.md"
[System.IO.File]::WriteAllText($statusLocal, $statusMd, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText("$syncFolder\STATUS_ATUAL.md", $statusMd, [System.Text.Encoding]::UTF8)

Write-Output "Sincronização concluída com sucesso em: $syncFolder"
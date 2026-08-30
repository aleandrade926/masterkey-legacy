Add-Type -AssemblyName System.IO.Compression.FileSystem

$files = Get-ChildItem -Path "C:\Users\Alexandre\Downloads" -Filter "*Transformando Posse*.pptx"
if ($files.Count -eq 0) {
    Write-Host "Arquivo não encontrado."
    exit
}

$pptxPath = $files[0].FullName
Write-Host "Lendo arquivo: $pptxPath"

$zip = [System.IO.Compression.ZipFile]::OpenRead($pptxPath)
$slideEntries = $zip.Entries | Where-Object { $_.FullName -match "ppt/slides/slide\d+\.xml" } | Sort-Object { [int]($_.Name -replace '\D','') }

$output = @()

foreach ($entry in $slideEntries) {
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    $reader.Close()
    $stream.Close()

    $xml = [xml]$content
    $texts = $xml.GetElementsByTagName("a:t") | ForEach-Object { $_.InnerText }
    $slideText = ($texts -join " ").Trim()

    $output += "### SLIDE " + $entry.Name
    $output += $slideText
    $output += ""
}

$zip.Dispose()

$outputPath = "c:\Users\Alexandre\masterkey-frontend\conteudo_ebook_extraido.txt"
$output | Out-File -FilePath $outputPath -Encoding UTF8
Write-Host "Conteúdo salvo com sucesso em: $outputPath"

param([switch]$CheckOnly)

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
$port = 4317
$url = "http://localhost:$port"
$mutex = [System.Threading.Mutex]::new($false, "Local\DraCarolinaMarinoSite$port")
$locked = $false

function Get-SiteStatus {
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 3
        if ($response.Content.Contains('id="hero-title"') -and $response.Content.Contains('Dra. Carolina Marino')) {
            return 'ready'
        }
        return 'other'
    } catch {
        if ($_.Exception.Response) { return 'other' }
        return 'offline'
    }
}

try {
    $locked = $mutex.WaitOne(90000)
    if (-not $locked) { throw 'A inicializacao ja esta em andamento. Tente de novo em alguns instantes.' }

    $status = Get-SiteStatus
    if ($status -eq 'other') { throw "A porta $port esta em uso por outro site. Feche esse servidor e abra este atalho novamente." }
    if ($status -eq 'offline') {
        $node = Get-Command node.exe -ErrorAction SilentlyContinue
        $npm = Get-Command npm.cmd -ErrorAction SilentlyContinue
        if (-not $node -or -not $npm) { throw 'Instale o Node.js com npm e abra este atalho novamente.' }
        if (-not (Test-Path -LiteralPath 'node_modules\next\dist\bin\next')) {
            Write-Host 'Instalando as dependencias do site...'
            & $npm.Source ci --no-audit --no-fund
            if ($LASTEXITCODE -ne 0) { throw 'O npm nao conseguiu instalar as dependencias. Confira sua conexao e tente novamente.' }
        }
        $logDir = Join-Path (Get-Location) '.next-launch'
        New-Item -ItemType Directory -Force -Path $logDir | Out-Null
        $server = Start-Process -FilePath $node.Source -ArgumentList @('node_modules/next/dist/bin/next', 'dev', '--hostname', 'localhost', '--port', $port) -WorkingDirectory (Get-Location).Path -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $logDir 'server.log') -RedirectStandardError (Join-Path $logDir 'server-errors.log')
        $deadline = [DateTime]::UtcNow.AddSeconds(55)
        do {
            Start-Sleep -Milliseconds 550
            $status = Get-SiteStatus
        } while ($status -ne 'ready' -and -not $server.HasExited -and [DateTime]::UtcNow -lt $deadline)
        if ($status -ne 'ready') { throw "O site nao iniciou. Consulte os logs em $logDir." }
    }

    if (-not $CheckOnly) { Start-Process $url }
    Write-Host "Site disponivel em $url"
} catch {
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
} finally {
    if ($locked) { $mutex.ReleaseMutex() }
    $mutex.Dispose()
}

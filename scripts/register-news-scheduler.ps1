# Tache planifiee Windows — mise a jour RSS P.A.S (2x par jour)
# Executer en administrateur : powershell -ExecutionPolicy Bypass -File scripts/register-news-scheduler.ps1

$TaskName = "PAS-Update-RSS-News"
$Root     = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Script   = Join-Path $Root "scripts\update-and-deploy-news.bat"

$Action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c `"$Script`"" -WorkingDirectory $Root
$Trigger = New-ScheduledTaskTrigger -Daily -At "06:00"
$Trigger2 = New-ScheduledTaskTrigger -Daily -At "18:00"
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger @($Trigger, $Trigger2) -Settings $Settings -Force -Description "Met a jour et deploie le flux RSS actualites autisme P.A.S"

Write-Host "Tache '$TaskName' enregistree — executions a 06:00 et 18:00." -ForegroundColor Green
Write-Host "Alternative serveur OVH : planifier curl sur api/cron-update-rss.php?key=..." -ForegroundColor Cyan


$ErrorActionPreference = "Stop"

$dest_ilumi   = "c:\Users\hiigo\Desktop\tripoliSite\public\images\ilumi-bueno"
$dest_ritmo   = "c:\Users\hiigo\Desktop\tripoliSite\public\images\ritmo-bueno"
$dest_bosque  = "c:\Users\hiigo\Desktop\tripoliSite\public\images\bosque-das-orquideas"

# ─── ILUMI BUENO ────────────────────────────────────────────
$ilumi_base = "C:\Users\hiigo\Downloads\ilumi-bueno-extract\ILUMI BUENO"

$ilumi_perspectivas = Join-Path $ilumi_base "Perspectivas"
$ilumi_area_comum   = Get-ChildItem $ilumi_perspectivas -Directory | Where-Object { $_.Name -like "*rea Comum*" } | Select-Object -First 1
$hero_ilumi = Get-ChildItem $ilumi_area_comum.FullName | Where-Object { $_.Name -like "*FACHADA_DIURNA*" } | Select-Object -First 1
Copy-Item $hero_ilumi.FullName (Join-Path $dest_ilumi "hero.jpg") -Force
Write-Host ("Ilumi hero copied - " + $hero_ilumi.Name)

$ilumi_fotos_dir = Get-ChildItem $ilumi_base -Directory | Where-Object { $_.Name -like "Fotos Reais*" } | Select-Object -First 1
$ilumi_fotos = Get-ChildItem $ilumi_fotos_dir.FullName -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|webp)$" -and $_.Length -gt 100KB } | Select-Object -First 8
$i = 1
foreach ($f in $ilumi_fotos) {
    $ext = $f.Extension.ToLower() -replace "\.jpeg$",".jpg"
    Copy-Item $f.FullName (Join-Path $dest_ilumi ("foto-" + $i + $ext)) -Force
    Write-Host ("Ilumi foto-" + $i + " copied")
    $i++
}

$ilumi_plantas_dir = Join-Path $ilumi_base "Plantas Ilustrativas"
$plantas_ilumi = Get-ChildItem $ilumi_plantas_dir -File | Where-Object { $_.Name -like "FINAL*" -and $_.Extension -match "\.(jpg|jpeg|png)$" } | Sort-Object Name
$pi = 1
foreach ($p in $plantas_ilumi) {
    $ext = $p.Extension.ToLower() -replace "\.jpeg$",".jpg"
    Copy-Item $p.FullName (Join-Path $dest_ilumi ("planta-" + $pi + $ext)) -Force
    Write-Host ("Ilumi planta-" + $pi + " copied")
    $pi++
}

# ─── RITMO BUENO ────────────────────────────────────────────
$ritmo_base = "C:\Users\hiigo\Downloads\ritmo-bueno-extract\RITMO BUENO"

$ritmo_fotos_dir = Get-ChildItem $ritmo_base -Directory | Where-Object { $_.Name -like "Fotos Reais*" } | Select-Object -First 1
$hero_ritmo = Get-ChildItem $ritmo_fotos_dir.FullName | Where-Object { $_.Name -like "00*FACHADA*" } | Select-Object -First 1
Copy-Item $hero_ritmo.FullName (Join-Path $dest_ritmo "hero.jpg") -Force
Write-Host ("Ritmo hero copied - " + $hero_ritmo.Name)

$ritmo_fotos = Get-ChildItem $ritmo_fotos_dir.FullName -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|webp)$" -and $_.Name -notlike "00*" -and $_.Length -gt 100KB } | Select-Object -First 8
$i = 1
foreach ($f in $ritmo_fotos) {
    $ext = $f.Extension.ToLower() -replace "\.jpeg$",".jpg"
    Copy-Item $f.FullName (Join-Path $dest_ritmo ("foto-" + $i + $ext)) -Force
    Write-Host ("Ritmo foto-" + $i + " copied")
    $i++
}

$ritmo_plantas_dir = Join-Path $ritmo_base "Plantas Aptos\Plantas com cotas (medidas)"
$plantas_ritmo = Get-ChildItem $ritmo_plantas_dir -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png)$" } | Sort-Object Name
$pi = 1
foreach ($p in $plantas_ritmo) {
    $ext = $p.Extension.ToLower() -replace "\.jpeg$",".jpg"
    Copy-Item $p.FullName (Join-Path $dest_ritmo ("planta-" + $pi + $ext)) -Force
    Write-Host ("Ritmo planta-" + $pi + " copied")
    $pi++
}

# ─── BOSQUE DAS ORQUIDEAS ───────────────────────────────────
$bosque_base = "C:\Users\hiigo\Downloads\bosque-extract"
$bosque_dir  = Get-ChildItem $bosque_base -Directory | Select-Object -First 1

$bosque_fotos_dir = Get-ChildItem $bosque_dir.FullName -Directory | Where-Object { $_.Name -like "Fotos Reais*" } | Select-Object -First 1
$hero_bosque = Get-ChildItem $bosque_fotos_dir.FullName | Where-Object { $_.Name -like "*portaria*" } | Select-Object -First 1
Copy-Item $hero_bosque.FullName (Join-Path $dest_bosque "hero.jpg") -Force
Write-Host ("Bosque hero copied - " + $hero_bosque.Name)

$bosque_fotos = Get-ChildItem $bosque_fotos_dir.FullName -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|webp|JPG|JPEG|PNG)$" -and $_.Name -notlike "*portaria*" -and $_.Length -gt 100KB } | Select-Object -First 8
$i = 1
foreach ($f in $bosque_fotos) {
    $ext = ".jpg"
    Copy-Item $f.FullName (Join-Path $dest_bosque ("foto-" + $i + $ext)) -Force
    Write-Host ("Bosque foto-" + $i + " copied")
    $i++
}

$bosque_plantas_dir = Get-ChildItem $bosque_dir.FullName -Directory | Where-Object { $_.Name -like "Plantas*" } | Select-Object -First 1
if ($bosque_plantas_dir) {
    $plantas_bosque = Get-ChildItem $bosque_plantas_dir.FullName -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|JPG|JPEG|PNG)$" } | Sort-Object Name
    $pi = 1
    foreach ($p in $plantas_bosque) {
        Copy-Item $p.FullName (Join-Path $dest_bosque ("planta-" + $pi + ".jpg")) -Force
        Write-Host ("Bosque planta-" + $pi + " copied")
        $pi++
    }
}

Write-Host ""
Write-Host "=== CONCLUIDO! ==="
Write-Host ("Ilumi  - " + (Get-ChildItem $dest_ilumi).Count + " arquivos")
Write-Host ("Ritmo  - " + (Get-ChildItem $dest_ritmo).Count + " arquivos")
Write-Host ("Bosque - " + (Get-ChildItem $dest_bosque).Count + " arquivos")

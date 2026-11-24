# Descarga las 8 fotos de la ficha de Google Maps de Black House a src/assets/img,
# reducidas a 1600 px como máximo y en JPEG. Astro las vuelve a optimizar (WebP, varios tamaños) al compilar.
#
# Uso, desde la carpeta del proyecto (X:\CARLOS\Daclos\Pagina_Web_Empresas\black-house-tattoo):
#   powershell -ExecutionPolicy Bypass -File scripts\descargar-fotos.ps1
#
# Las subió a Maps el propio estudio (sep-nov 2026). PENDIENTE: pedir permiso para usarlas en la web (ver CREDITS.md).
# Si Google cambia los enlaces y falla, abre la ficha de Maps → Fotos y guárdalas a mano con estos nombres.

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$base = 'https://lh3.googleusercontent.com/gps-cs-s/'
$dest = Join-Path $PSScriptRoot '..\src\assets\img'
New-Item -ItemType Directory -Force -Path $dest | Out-Null
$tmp = Join-Path $env:TEMP 'bh-fotos'
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

$fotos = [ordered]@{
  # Fachada negra con el rótulo y el neón rosa (portada)
  'facana.jpg'             = 'ANWiy9T6BTU_QT7F7BuT_EBYk-YMF09T-PO5_a_nrF4K7XaS_-3DTjxEjocPa6YQTQgEhgyVd3dsDddvfr4NnmQzRl17-1XEJNU2Y6BPU4meZAO2WZ5OVTOBKk1xMua7Tnu7R5Lvp-gwfxEatltN'
  # Cabina con la camilla y el neón azul en la pared (el estudio)
  'cabina.jpg'             = 'ANWiy9TDWoXIIvgguMdpk8QV4Ce3Xy_Af0jod3F3_R6kdm8pMCJ_KK6Viw_yxcBNQn0OPNYTfpdFyCWmjaW40cOb_oqT4KkTveIjd8n6HKzHVGP0MGu1OCHD1ysXbSC_MuZe5-YNg4Nof7qToCUW'
  # Máscara oni en el pecho
  'oni-pit.jpg'            = 'ANWiy9QJc17kNqmMK0Vw1az3iCEJS-Y1dVhmP5MW3VkSCxroX1t5905_ih24pysr6Fc3iuEOxon5B-yqODV7EbUz8FgUhP_AC8qbAyx6F9GzUVseLSm8FnaqSWeEtuM-mIY_60_zmLYB2FN9UoQ'
  # Recepción con el logo y el neón magenta (el estudio)
  'recepcio.jpg'           = 'ANWiy9TgCDZjevGO3ZZ1rJpOhvrZaH3Qed3MZr7E6V-2AzZ3XhRuR7U30BV9aIkfqgZtgkYskm9DAjFVW8fmDH3fiNhAUXUTAQK0A-_3VojfRV6CXG7Nl_tX_S0TMdi_PA3CHfGtEFuV6ndWEBm2'
  # Antebrazo: ojo de la providencia, reloj y rosa
  'ull-rellotge.jpg'       = 'ANWiy9RGJ89tS3fF1H5FyQWQLvgLYYgCmfD3TiVWo624YljNtb2mWHtcIpEzozf39nBdLOBsjLTZbvB7FDv70H_I2CCfEbeWGaNhQvhXitKlzJBblUTtxZNEQPABITwiGx3DTDGju25ewsPF8zdJ'
  # Antebrazo: retrato de mujer y calavera
  'dona-calavera.jpg'      = 'ANWiy9Q5uFtmOrg6i0I3hidasaigxOkUQpcWadYdn9vYlbdEuD90JQ7OecwQ2xwNqk79LtDJiti59-lAzgv7U0tDvyLdXKLOe9kBdAuyowHxYkYL-Whlp6Rd5XqdqM_Rgtgj4II3WQXA-zqRGKOv'
  # Antebrazo: mujer con los ojos vendados
  'dona-ulls-embenats.jpg' = 'ANWiy9SjOGNjaW2GjuBAV-_63l0nJkMcSvqpHMMAu6o0PPGXjJkv12X41jYbaxBTc_jWnrjXVUi_MzimjqXNr5DS5Q4OlXhc5NNi8U6CT9eZ8jReoGptNFlgJ1rRNJKiCKE2HK5Z3eDPIH_ZU8kM'
  # Cristo en toda la espalda
  'crist-esquena.jpg'      = 'ANWiy9T0lxk5TIQvrzCOjnc3O6lsVJX9T-LoFRd1tw5WQgZWYb5dbdnMX-OolnaZR465TZzRDVU6P4XYHtLAivPVnrSZN7wJWSn3X5t9gysax5BsSnXfBllUohMZ2M4vY0tKNrZH2ZZvZ8YVlfoj'
}

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)
$max = 1600

foreach ($nom in $fotos.Keys) {
  $url = $base + $fotos[$nom] + '=w1600-k-no'
  $orig = Join-Path $tmp $nom
  Write-Host "Descargando $nom ..."
  Invoke-WebRequest -Uri $url -OutFile $orig -UseBasicParsing

  $img = [System.Drawing.Image]::FromFile($orig)
  # Las fotos del móvil guardan el giro en el EXIF (etiqueta 274): se aplica antes de reducir.
  if ($img.PropertyIdList -contains 274) {
    switch ([int]$img.GetPropertyItem(274).Value[0]) {
      3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
      6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
      8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
  }
  $escala = [Math]::Min(1.0, $max / [Math]::Max($img.Width, $img.Height))
  $w = [int]($img.Width * $escala); $h = [int]($img.Height * $escala)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $w, $h)
  $bmp.Save((Join-Path $dest $nom), $jpeg, $params)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}

Remove-Item -Recurse -Force $tmp
Write-Host "Listo: $($fotos.Count) imagenes en src\assets\img"

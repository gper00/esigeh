## 1. Persiapan Data (Export & Upload)

### A. Ekspor dari QGIS
GEE tidak mendukung format `.js` (GeoJSON yang dibungkus variabel). Anda harus mengekspor ulang layer tersebut:
1. Buka Project ESIGEH di QGIS.
2. Klik kanan pada layer -> **Export** -> **Save Features As...**
3. Pilih format **ESRI Shapefile** atau **GeoJSON**.
4. **PENTING:** Pastikan CRS diatur ke `EPSG:4326 - WGS 84`.
5. Simpan file dalam satu folder (pastikan file `.shp`, `.shx`, `.dbf`, dan `.prj` lengkap untuk Shapefile).

### B. Upload ke GEE Asset
1. Buka [Google Earth Engine Code Editor](https://code.earthengine.google.com/).
2. Pilih tab **Assets** di panel kiri atas.
3. Klik **NEW** -> **Table Upload** -> **Shapefiles**.
4. Pilih file hasil ekspor QGIS tadi.
5. Klik **Upload** dan tunggu hingga proses di tab *Tasks* (kanan atas) selesai.

---

## 2. Implementasi Script (Template GEE)

Gunakan kerangka script di bawah ini sebagai pengganti file `index.html` dan `qgis2web.js` kamu.

```javascript
/**
 * ESIGEH - Sistem Informasi Jalur Evakuasi Lombok Utara
 * Framework: GEE Interactive Web-App
 */

// 1. IMPORT DATA ASSET
// Masukkan path asset yang sudah diupload (contoh: users/nama/esigeh_jalur)
var jalurEvakuasi = ee.FeatureCollection("users/nama_anda/esigeh_jalur");
var titikEvakuasi = ee.FeatureCollection("users/nama_anda/esigeh_titik");
var batasAdmin = ee.FeatureCollection("users/nama_anda/esigeh_batas");

// 2. STYLING & VISUALISASI
var styleJalur = {color: '#e5b636', width: 2};
var styleTitik = {pointShape: 'circle', pointSize: 5, color: '#17ffda'};

Map.centerObject(batasAdmin, 12);
Map.setOptions('SATELLITE');

Map.addLayer(jalurEvakuasi, styleJalur, 'Jalur Evakuasi');
Map.addLayer(titikEvakuasi, styleTitik, 'Titik Evakuasi');

// 3. ANTARMUKA PENGGUNA (UI)
var panel = ui.Panel({
  style: {width: '350px', padding: '15px'}
});

var header = ui.Label('Dashboard ESIGEH', 
  {fontSize: '24px', fontWeight: 'bold', color: '#c43c39'});

var deskripsi = ui.Label('Sistem mitigasi bencana untuk memandu masyarakat menuju jalur evakuasi terdekat secara interaktif.');

panel.add(header).add(deskripsi);
ui.root.add(panel);

// 4. KONTROL LAYER (CHECKBOX)
panel.add(ui.Label('Kontrol Layer:', {fontWeight: 'bold'}));

var checkJalur = ui.Checkbox('Tampilkan Jalur Evakuasi', true);
checkJalur.onChange(function(checked) {
  Map.layers().get(0).setShown(checked);
});

var checkTitik = ui.Checkbox('Tampilkan Titik Evakuasi', true);
checkTitik.onChange(function(checked) {
  Map.layers().get(1).setShown(checked);
});

panel.add(checkJalur).add(checkTitik);

// 5. PENAMBAHAN ANALISIS TOPOGRAFI (Opsional - Keunggulan GEE)
var srtm = ee.Image("USGS/SRTMGL1_003");
var slope = ee.Terrain.slope(srtm);
Map.addLayer(slope, {min: 0, max: 30, palette: ['white', 'black']}, 'Kelerengan (Slope)', false);
```


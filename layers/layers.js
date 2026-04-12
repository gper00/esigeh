var wms_layers = [];


        var lyr_BingSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'opacity': 1.000000,
            source: new ol.source.XYZ({
                attributions: '© Google',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
                maxZoom: 19
            })
        });
var format_Pemukiman_1 = new ol.format.GeoJSON();
var features_Pemukiman_1 = format_Pemukiman_1.readFeatures(json_Pemukiman_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Pemukiman_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Pemukiman_1.addFeatures(features_Pemukiman_1);
var lyr_Pemukiman_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Pemukiman_1, 
                style: style_Pemukiman_1,
                popuplayertitle: 'Pemukiman',
                interactive: true,
                title: '<img src="styles/legend/Pemukiman_1.png" /> Pemukiman'
            });
var format_Batasadministrasi_2 = new ol.format.GeoJSON();
var features_Batasadministrasi_2 = format_Batasadministrasi_2.readFeatures(json_Batasadministrasi_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Batasadministrasi_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Batasadministrasi_2.addFeatures(features_Batasadministrasi_2);
var lyr_Batasadministrasi_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Batasadministrasi_2, 
                style: style_Batasadministrasi_2,
                popuplayertitle: 'Batas administrasi',
                interactive: true,
                title: '<img src="styles/legend/Batasadministrasi_2.png" /> Batas administrasi'
            });
var format_Titikawal_3 = new ol.format.GeoJSON();
var features_Titikawal_3 = format_Titikawal_3.readFeatures(json_Titikawal_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Titikawal_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Titikawal_3.addFeatures(features_Titikawal_3);
var lyr_Titikawal_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Titikawal_3, 
                style: style_Titikawal_3,
                popuplayertitle: 'Titik awal',
                interactive: true,
                title: '<img src="styles/legend/Titikawal_3.png" /> Titik awal'
            });
var format_titikevakuasiupdated_4 = new ol.format.GeoJSON();
var features_titikevakuasiupdated_4 = format_titikevakuasiupdated_4.readFeatures(json_titikevakuasiupdated_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_titikevakuasiupdated_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_titikevakuasiupdated_4.addFeatures(features_titikevakuasiupdated_4);
var lyr_titikevakuasiupdated_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_titikevakuasiupdated_4, 
                style: style_titikevakuasiupdated_4,
                popuplayertitle: 'titik evakuasi updated',
                interactive: true,
                title: '<img src="styles/legend/titikevakuasiupdated_4.png" /> titik evakuasi updated'
            });
var format_Jalan_5 = new ol.format.GeoJSON();
var features_Jalan_5 = format_Jalan_5.readFeatures(json_Jalan_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Jalan_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Jalan_5.addFeatures(features_Jalan_5);
var lyr_Jalan_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Jalan_5, 
                style: style_Jalan_5,
                popuplayertitle: 'Jalan',
                interactive: true,
                title: '<img src="styles/legend/Jalan_5.png" /> Jalan'
            });
var format_Jalurevakuasi_6 = new ol.format.GeoJSON();
var features_Jalurevakuasi_6 = format_Jalurevakuasi_6.readFeatures(json_Jalurevakuasi_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Jalurevakuasi_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Jalurevakuasi_6.addFeatures(features_Jalurevakuasi_6);
var lyr_Jalurevakuasi_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Jalurevakuasi_6, 
                style: style_Jalurevakuasi_6,
                popuplayertitle: 'Jalur evakuasi',
                interactive: true,
                title: '<img src="styles/legend/Jalurevakuasi_6.png" /> Jalur evakuasi'
            });

lyr_BingSatellite_0.setVisible(true);lyr_Pemukiman_1.setVisible(true);lyr_Batasadministrasi_2.setVisible(true);lyr_Titikawal_3.setVisible(true);lyr_titikevakuasiupdated_4.setVisible(true);lyr_Jalan_5.setVisible(true);lyr_Jalurevakuasi_6.setVisible(true);
var layersList = [lyr_BingSatellite_0,lyr_Pemukiman_1,lyr_Batasadministrasi_2,lyr_Titikawal_3,lyr_titikevakuasiupdated_4,lyr_Jalan_5,lyr_Jalurevakuasi_6];
lyr_Pemukiman_1.set('fieldAliases', {'NAMOBJ': 'NAMOBJ', 'FCODE': 'FCODE', 'REMARK': 'REMARK', 'METADATA': 'METADATA', 'SRS_ID': 'SRS_ID', 'LAYER': 'LAYER', 'SHAPE_Leng': 'SHAPE_Leng', 'SHAPE_Area': 'SHAPE_Area', });
lyr_Batasadministrasi_2.set('fieldAliases', {'NAMOBJ': 'NAMOBJ', 'FCODE': 'FCODE', 'REMARK': 'REMARK', 'METADATA': 'METADATA', 'SRS_ID': 'SRS_ID', 'KDBBPS': 'KDBBPS', 'KDCBPS': 'KDCBPS', 'KDCPUM': 'KDCPUM', 'KDEBPS': 'KDEBPS', 'KDEPUM': 'KDEPUM', 'KDPBPS': 'KDPBPS', 'KDPKAB': 'KDPKAB', 'KDPPUM': 'KDPPUM', 'LUASWH': 'LUASWH', 'TIPADM': 'TIPADM', 'WADMKC': 'WADMKC', 'WADMKD': 'WADMKD', 'WADMKK': 'WADMKK', 'WADMPR': 'WADMPR', 'WIADKC': 'WIADKC', 'WIADKK': 'WIADKK', 'WIADPR': 'WIADPR', 'WIADKD': 'WIADKD', 'UUPP': 'UUPP', 'luas': 'luas', 'SHAPE_Leng': 'SHAPE_Leng', 'SHAPE_Area': 'SHAPE_Area', });
lyr_Titikawal_3.set('fieldAliases', {'NAMOBJ': 'NAMOBJ', 'FCODE': 'FCODE', 'REMARK': 'REMARK', 'METADATA': 'METADATA', 'SRS_ID': 'SRS_ID', 'LAYER': 'LAYER', 'SHAPE_Leng': 'SHAPE_Leng', 'SHAPE_Area': 'SHAPE_Area', });
lyr_titikevakuasiupdated_4.set('fieldAliases', {'Jenis': 'Jenis', });
lyr_Jalan_5.set('fieldAliases', {'NAMOBJ': 'NAMOBJ', 'FCODE': 'FCODE', 'REMARK': 'REMARK', 'METADATA': 'METADATA', 'SRS_ID': 'SRS_ID', 'ARHRJL': 'ARHRJL', 'AUTRJL': 'AUTRJL', 'FGSRJL': 'FGSRJL', 'JARRJL': 'JARRJL', 'JPARJL': 'JPARJL', 'KLLRJL': 'KLLRJL', 'KONRJL': 'KONRJL', 'KPMSTR': 'KPMSTR', 'LKONOF': 'LKONOF', 'LKSBSP': 'LKSBSP', 'LKSRTA': 'LKSRTA', 'LLHRRT': 'LLHRRT', 'LOCRJL': 'LOCRJL', 'LBRBHJ': 'LBRBHJ', 'LBRJLN': 'LBRJLN', 'MATRJL': 'MATRJL', 'MEDRJL': 'MEDRJL', 'SPCRJL': 'SPCRJL', 'STARJL': 'STARJL', 'TOLRJL': 'TOLRJL', 'UTKRJL': 'UTKRJL', 'VLCPRT': 'VLCPRT', 'WLYRJL': 'WLYRJL', 'TGL_SK': 'TGL_SK', 'JLNLYG': 'JLNLYG', 'KLSRJL': 'KLSRJL', 'SHAPE_Leng': 'SHAPE_Leng', });
lyr_Jalurevakuasi_6.set('fieldAliases', {'NAMOBJ': 'NAMOBJ', 'FCODE': 'FCODE', 'REMARK': 'REMARK', 'METADATA': 'METADATA', 'SRS_ID': 'SRS_ID', 'LAYER': 'LAYER', 'SHAPE_Leng': 'SHAPE_Leng', 'SHAPE_Area': 'SHAPE_Area', 'start': 'start', 'end': 'end', 'cost': 'cost', 'path': 'path', });
lyr_Pemukiman_1.set('fieldImages', {'NAMOBJ': 'TextEdit', 'FCODE': 'TextEdit', 'REMARK': 'TextEdit', 'METADATA': 'TextEdit', 'SRS_ID': 'TextEdit', 'LAYER': 'TextEdit', 'SHAPE_Leng': 'TextEdit', 'SHAPE_Area': 'TextEdit', });
lyr_Batasadministrasi_2.set('fieldImages', {'NAMOBJ': '', 'FCODE': '', 'REMARK': '', 'METADATA': '', 'SRS_ID': '', 'KDBBPS': '', 'KDCBPS': '', 'KDCPUM': '', 'KDEBPS': '', 'KDEPUM': '', 'KDPBPS': '', 'KDPKAB': '', 'KDPPUM': '', 'LUASWH': '', 'TIPADM': '', 'WADMKC': '', 'WADMKD': '', 'WADMKK': '', 'WADMPR': '', 'WIADKC': '', 'WIADKK': '', 'WIADPR': '', 'WIADKD': '', 'UUPP': '', 'luas': '', 'SHAPE_Leng': '', 'SHAPE_Area': '', });
lyr_Titikawal_3.set('fieldImages', {'NAMOBJ': '', 'FCODE': '', 'REMARK': '', 'METADATA': '', 'SRS_ID': '', 'LAYER': '', 'SHAPE_Leng': '', 'SHAPE_Area': '', });
lyr_titikevakuasiupdated_4.set('fieldImages', {'Jenis': 'TextEdit', });
lyr_Jalan_5.set('fieldImages', {'NAMOBJ': '', 'FCODE': '', 'REMARK': '', 'METADATA': '', 'SRS_ID': '', 'ARHRJL': '', 'AUTRJL': '', 'FGSRJL': '', 'JARRJL': '', 'JPARJL': '', 'KLLRJL': '', 'KONRJL': '', 'KPMSTR': '', 'LKONOF': '', 'LKSBSP': '', 'LKSRTA': '', 'LLHRRT': '', 'LOCRJL': '', 'LBRBHJ': '', 'LBRJLN': '', 'MATRJL': '', 'MEDRJL': '', 'SPCRJL': '', 'STARJL': '', 'TOLRJL': '', 'UTKRJL': '', 'VLCPRT': '', 'WLYRJL': '', 'TGL_SK': '', 'JLNLYG': '', 'KLSRJL': '', 'SHAPE_Leng': '', });
lyr_Jalurevakuasi_6.set('fieldImages', {'NAMOBJ': '', 'FCODE': '', 'REMARK': '', 'METADATA': '', 'SRS_ID': '', 'LAYER': '', 'SHAPE_Leng': '', 'SHAPE_Area': '', 'start': '', 'end': '', 'cost': '', 'path': '', });
lyr_Pemukiman_1.set('fieldLabels', {'NAMOBJ': 'no label', 'FCODE': 'no label', 'REMARK': 'no label', 'METADATA': 'no label', 'SRS_ID': 'no label', 'LAYER': 'no label', 'SHAPE_Leng': 'no label', 'SHAPE_Area': 'no label', });
lyr_Batasadministrasi_2.set('fieldLabels', {'NAMOBJ': 'no label', 'FCODE': 'no label', 'REMARK': 'no label', 'METADATA': 'no label', 'SRS_ID': 'no label', 'KDBBPS': 'no label', 'KDCBPS': 'no label', 'KDCPUM': 'no label', 'KDEBPS': 'no label', 'KDEPUM': 'no label', 'KDPBPS': 'no label', 'KDPKAB': 'no label', 'KDPPUM': 'no label', 'LUASWH': 'no label', 'TIPADM': 'no label', 'WADMKC': 'no label', 'WADMKD': 'no label', 'WADMKK': 'no label', 'WADMPR': 'no label', 'WIADKC': 'no label', 'WIADKK': 'no label', 'WIADPR': 'no label', 'WIADKD': 'no label', 'UUPP': 'no label', 'luas': 'no label', 'SHAPE_Leng': 'no label', 'SHAPE_Area': 'no label', });
lyr_Titikawal_3.set('fieldLabels', {'NAMOBJ': 'no label', 'FCODE': 'no label', 'REMARK': 'no label', 'METADATA': 'no label', 'SRS_ID': 'no label', 'LAYER': 'no label', 'SHAPE_Leng': 'no label', 'SHAPE_Area': 'no label', });
lyr_titikevakuasiupdated_4.set('fieldLabels', {'Jenis': 'no label', });
lyr_Jalan_5.set('fieldLabels', {'NAMOBJ': 'no label', 'FCODE': 'no label', 'REMARK': 'no label', 'METADATA': 'no label', 'SRS_ID': 'no label', 'ARHRJL': 'no label', 'AUTRJL': 'no label', 'FGSRJL': 'no label', 'JARRJL': 'no label', 'JPARJL': 'no label', 'KLLRJL': 'no label', 'KONRJL': 'no label', 'KPMSTR': 'no label', 'LKONOF': 'no label', 'LKSBSP': 'no label', 'LKSRTA': 'no label', 'LLHRRT': 'no label', 'LOCRJL': 'no label', 'LBRBHJ': 'no label', 'LBRJLN': 'no label', 'MATRJL': 'no label', 'MEDRJL': 'no label', 'SPCRJL': 'no label', 'STARJL': 'no label', 'TOLRJL': 'no label', 'UTKRJL': 'no label', 'VLCPRT': 'no label', 'WLYRJL': 'no label', 'TGL_SK': 'no label', 'JLNLYG': 'no label', 'KLSRJL': 'no label', 'SHAPE_Leng': 'no label', });
lyr_Jalurevakuasi_6.set('fieldLabels', {'NAMOBJ': 'no label', 'FCODE': 'no label', 'REMARK': 'no label', 'METADATA': 'no label', 'SRS_ID': 'no label', 'LAYER': 'no label', 'SHAPE_Leng': 'no label', 'SHAPE_Area': 'no label', 'start': 'no label', 'end': 'no label', 'cost': 'no label', 'path': 'no label', });
lyr_Jalurevakuasi_6.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
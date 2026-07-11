// ======================================
// BM TOOLS v2.0
// PART 1
// ======================================

// Daftar Store
let storeSaya = [];

// ===============================
// SAAT WEBSITE DIBUKA
// ===============================

window.onload = function(){

    loadStore();

};

// ===============================
// LOAD STORE DARI LOCAL STORAGE
// ===============================

function loadStore(){

    let data = localStorage.getItem("bmtools_store");

    if(data){

        storeSaya = JSON.parse(data);

    }else{

        // Belum ada setting store
        document.getElementById("settingModal").style.display = "flex";

    }

}

// ===============================
// BUKA SETTING
// ===============================

function openSetting(){

    document.getElementById("settingModal").style.display = "flex";

    document.getElementById("storeInput").value = storeSaya.join("\n");

    setTimeout(function(){

        document.getElementById("storeInput").focus();

    },100);

}

// ===============================
// TUTUP SETTING
// ===============================

function closeSetting(){

    document.getElementById("settingModal").style.display = "none";

}

// ===============================
// SIMPAN STORE
// ===============================

function saveStore(){

    let isi = document.getElementById("storeInput").value;

    let hasil = isi
        .split("\n")
        .map(item => item.trim().toUpperCase())
        .filter(item => item != "");

    // Hilangkan store yang sama
    hasil = [...new Set(hasil)];

    // Urutkan A-Z
    hasil.sort();

    if(hasil.length == 0){

        alert("Masukkan minimal satu Store.");

        return;

    }

    storeSaya = hasil;

    localStorage.setItem(
        "bmtools_store",
        JSON.stringify(storeSaya)
    );

    closeSetting();

    alert("Store berhasil disimpan.");

}
// ===============================
// FILTER STORE
// ===============================

function filterStore(){

    if(storeSaya.length==0){

        alert("Silakan atur Store terlebih dahulu.");

        openSetting();

        return;

    }

    let input = document.getElementById("input").value;

    if(input.trim()==""){

        alert("Paste jadwal pengiriman terlebih dahulu.");

        return;

    }

    let text = input.toUpperCase();

    // ==========================
    // Ambil Tanggal
    // ==========================

    let tanggal = "Tanggal tidak ditemukan";

    let baris = input.split("\n");

    for(let i=0;i<baris.length;i++){

        if(baris[i].toLowerCase().includes("hari/tgl")){

            let bagian = baris[i].split(":");

            if(bagian.length>1){

                tanggal = bagian[1]
                .replace(/\*/g,"")
                .trim();

            }

            break;

        }

    }

    // ==========================
    // Filter Store
    // ==========================

    let adaPengiriman = [];

    let belumAda = [];

    storeSaya.forEach(store=>{

        if(text.includes(store)){

            adaPengiriman.push(store);

        }else{

            belumAda.push(store);

        }

    });

    // ==========================
    // Progress Bar
    // ==========================

    let persen =
    (adaPengiriman.length/storeSaya.length)*100;

    document.getElementById("progressContainer").style.display="block";

    document.getElementById("progressBar").style.width=
    persen+"%";

    document.getElementById("progressText").innerHTML=

    `${adaPengiriman.length} / ${storeSaya.length} Store`;

    // ==========================
    // Tanggal
    // ==========================

    document.getElementById("tanggal").innerHTML=

    `<h3>📅 ${tanggal}</h3>`;

    // ==========================
    // HTML
    // ==========================

    let html="";

    html+="<div class='card'>";

    html+=`<h3>🟢 Ada Pengiriman (${adaPengiriman.length})</h3>`;

    adaPengiriman.forEach(store=>{

        html+=`<p class="ok">✅ ${store}</p>`;

    });

    html+="<hr>";

    html+=`<h3>🔴 Belum Ada Pengiriman (${belumAda.length})</h3>`;

    belumAda.forEach(store=>{

        html+=`<p class="no">❌ ${store}</p>`;

    });

    html+="</div>";

    document.getElementById("hasil").innerHTML=html;

}
// ===============================
// CLEAR
// ===============================

function clearData(){

    document.getElementById("input").value="";

    document.getElementById("tanggal").innerHTML="";

    document.getElementById("hasil").innerHTML="";

    document.getElementById("progressContainer").style.display="none";

}



// ===============================
// COPY RESULT
// ===============================

function copyResult(){

    let tanggal =
    document.getElementById("tanggal").innerText;

    let hasil =
    document.getElementById("hasil").innerText;

    if(hasil==""){

        alert("Belum ada hasil.");

        return;

    }

    let text =
    tanggal + "\n\n" + hasil;

    navigator.clipboard.writeText(text);

    alert("Hasil berhasil di-copy.");

}



// ===============================
// DOWNLOAD JPG
// ===============================

function downloadJPG(){

    let area =
    document.getElementById("captureArea");

    if(area.innerHTML.trim()==""){

        alert("Belum ada hasil.");

        return;

    }

    html2canvas(area).then(function(canvas){

        let link=document.createElement("a");

        link.download="Delivery Schedule.jpg";

        link.href=canvas.toDataURL();

        link.click();

    });

}
// ======================================
// BM TOOLS v2.0
// PART 4
// ======================================

// Tutup modal jika klik area gelap
window.onclick = function(event){

    let modal = document.getElementById("settingModal");

    if(event.target == modal){

        closeSetting();

    }

}

// Tutup modal dengan tombol ESC
document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        closeSetting();

    }

});

// Saat modal dibuka langsung fokus ke textarea
function openSetting(){

    document.getElementById("settingModal").style.display="flex";

    document.getElementById("storeInput").value =
    storeSaya.join("\n");

    setTimeout(function(){

        document.getElementById("storeInput").focus();

    },100);

}

// Simpan Store (versi lebih pintar)
function saveStore(){

    let isi =
    document.getElementById("storeInput").value;

    let hasil =
    isi.split("\n")
    .map(x => x.trim().toUpperCase())
    .filter(x => x != "");

    // Hilangkan data yang sama
    hasil = [...new Set(hasil)];

    // Urutkan A-Z
    hasil.sort();

    if(hasil.length == 0){

        alert("Masukkan minimal satu Store.");

        return;

    }

    storeSaya = hasil;

    localStorage.setItem(
        "bmtools_store",
        JSON.stringify(storeSaya)
    );

    closeSetting();

    alert("Store berhasil disimpan.");

}
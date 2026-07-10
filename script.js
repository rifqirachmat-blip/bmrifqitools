// ================================
// BM TOOLS - Delivery Schedule
// ================================

const storeSaya = [
    "BDIP",
    "DBOT",
    "CHPL",
    "XBTU",
    "KINN",
    "XKPT",
    "ISTN",
    "CIMA",
    "XRUY",
    "XEUM"
];

// Variabel untuk tombol Copy
let hasilCopy = "";

function filterStore() {

    const input = document.getElementById("input").value;
    const text = input.toUpperCase();

    // ===========================
    // Ambil Tanggal
    // ===========================

    let tanggal = "Tanggal tidak ditemukan";

    const baris = input.split("\n");

    for (let i = 0; i < baris.length; i++) {

        if (baris[i].toLowerCase().includes("hari/tgl")) {

            let bagian = baris[i].split(":");

            if (bagian.length > 1) {
                tanggal = bagian[1].replace(/\*/g, "").trim();
            }

            break;

        }

    }

    // ===========================
    // Filter Store
    // ===========================

    let adaPengiriman = [];
    let belumAda = [];

    storeSaya.forEach(store => {

        if (text.includes(store)) {

            adaPengiriman.push(store);

        } else {

            belumAda.push(store);

        }

    });

    // ===========================
    // Progress Bar
    // ===========================

    let persen = (adaPengiriman.length / storeSaya.length) * 100;

    document.getElementById("progressContainer").style.display = "block";

    document.getElementById("progressBar").style.width = persen + "%";

    document.getElementById("progressText").innerHTML =
        `${adaPengiriman.length} / ${storeSaya.length} Store`;

    // ===========================
    // Tanggal
    // ===========================

    document.getElementById("tanggal").innerHTML =
        `<h3>📅 ${tanggal}</h3>`;

    // ===========================
    // HTML Hasil
    // ===========================

    let html = "";

    html += `<div class="card">`;

    html += `<h3>🟢 Ada Pengiriman (${adaPengiriman.length})</h3>`;

    adaPengiriman.forEach(store => {

        html += `<p class="ok">✅ ${store}</p>`;

    });

    html += `<hr>`;

    html += `<h3>🔴 Belum Ada Pengiriman (${belumAda.length})</h3>`;

    belumAda.forEach(store => {

        html += `<p class="no">❌ ${store}</p>`;

    });

    html += `</div>`;

    document.getElementById("hasil").innerHTML = html;

    // ===========================
    // Text untuk COPY
    // ===========================

    hasilCopy = `📦 Delivery Schedule

👤 BM Rifqi D Rachmat

📅 ${tanggal}

🟢 Ada Pengiriman (${adaPengiriman.length})

`;

    adaPengiriman.forEach(store => {

        hasilCopy += `✅ ${store}\n`;

    });

    hasilCopy += `

🔴 Belum Ada Pengiriman (${belumAda.length})

`;

    belumAda.forEach(store => {

        hasilCopy += `❌ ${store}\n`;

    });

}

// =====================================
// CLEAR
// =====================================

function clearData() {

    document.getElementById("input").value = "";

    document.getElementById("tanggal").innerHTML = "";

    document.getElementById("hasil").innerHTML = "";

    document.getElementById("progressContainer").style.display = "none";

    document.getElementById("progressBar").style.width = "0%";

    document.getElementById("progressText").innerHTML = "0 / 10 Store";

}

// =====================================
// COPY
// =====================================

function copyResult() {

    if (hasilCopy == "") {

        alert("Silakan klik Filter terlebih dahulu.");

        return;

    }

    navigator.clipboard.writeText(hasilCopy);

    alert("✅ Hasil berhasil dicopy.");

}

// =====================================
// DOWNLOAD JPG
// =====================================

function downloadJPG() {

    if(document.getElementById("hasil").innerHTML==""){

        alert("Silakan Filter terlebih dahulu.");

        return;

    }

    html2canvas(document.getElementById("captureArea")).then(canvas=>{

        const link=document.createElement("a");

        link.download="Delivery Schedule.jpg";

        link.href=canvas.toDataURL("image/jpeg",1);

        link.click();

    });

}
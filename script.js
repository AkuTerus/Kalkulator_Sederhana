const calc = {
    output: get("#output"),
    tampilOutput: "0",
    sesiOpt: false,
    indexSliceOpt: 0,
    nilaiBaru: false,
    listOpt: buatListOpt(),

    init: function () {
        this.output.style.fontSize = this.tampilOutput.length <= 12
            ? "3.7rem"
            : this.tampilOutput.length <= 20
                ? "2.3rem"
                : "1.5rem";
        this.output.value = this.tampilOutput;
    },
    cekPernahTitik: function () {
        let outputArray = this.tampilOutput.split("");
        return outputArray.slice(this.indexSliceOpt).includes(".") ? true : false;
    },

    isMaxLength: function () {
        return this.tampilOutput.length == 31 ? true : false;
    }

}


const tombolAksi = {
    angka: function (nilaiAngka) {
        // if (calc.isMaxLength()) return alert("panjang mencapai maksimal");
        if (calc.isMaxLength()) return alert("Angka Telah Maksimal | Tekan tombol C");
        calc.sesiOpt && (calc.sesiOpt = false);
        if (calc.nilaiBaru) {
            calc.nilaiBaru = false;
            this.clear();
        } if (calc.tampilOutput == "0" && nilaiAngka != ".") {
            calc.tampilOutput = nilaiAngka;
        } else {
            if (nilaiAngka == ".") {
                if (calc.cekPernahTitik()) return;
                if (calc.indexSliceOpt != 0) {
                    if (calc.indexSliceOpt == calc.tampilOutput.length) return;
                }
            }

            calc.tampilOutput += nilaiAngka;
        }
        calc.init();
    },

    opt: function (nilaiOpt) {
        if (calc.isMaxLength()) return alert("Angka Telah Maksimal | Tekan tombol C");
        if (calc.tampilOutput == "0" || calc.tampilOutput.split("").pop() == ".") return;
        calc.nilaiBaru && (calc.nilaiBaru = false);
        nilaiOpt = (nilaiOpt == "x")
            ? "*"
            : (nilaiOpt == "MOD")
                ? "%"
                : nilaiOpt;

        if (!calc.sesiOpt) {
            calc.tampilOutput += nilaiOpt;
            calc.indexSliceOpt = calc.tampilOutput.length;
            calc.sesiOpt = true;
        } else {
            let explode = calc.tampilOutput.split("");
            explode[explode.length - 1] = nilaiOpt;
            calc.tampilOutput = explode.join("");
        }
        calc.init();
    },

    clear: function () {
        calc.tampilOutput = "0";
        calc.sesiOpt = false;
        calc.pernahTitik = false;
        calc.init();
    },

    hapus: function () {
        let proses = calc.tampilOutput.split("");

        if (calc.tampilOutput.length == 1) {
            calc.tampilOutput = "0";
            calc.init();
            return;
        }
        let terhapus = proses.pop();

        if (calc.listOpt.includes(terhapus)) {
            let indexOptKetemu = null;
            for (let i = proses.length - 1; i >= 0; i--) {
                if (calc.listOpt.includes(proses[i])) {
                    indexOptKetemu = i + 1;
                    break;
                }
            }
            calc.indexSliceOpt = indexOptKetemu || 0;
        }

        if (calc.listOpt.includes(proses[proses.length - 1]))
            calc.sesiOpt = true;
        else
            calc.sesiOpt = false;

        calc.tampilOutput = proses.join("");
        calc.init();
    },

    hasil: function () {
        calc.nilaiBaru = true;
        calc.tampilOutput = String(eval(calc.tampilOutput));
        calc.init();
    },
}

calc.init();
for (const elem of getAll(".angka")) {
    elem.addEventListener("click", function (e) {
        tombolAksi.angka(e.target.innerText);
    })
}

// Oprator
for (const elem of getAll(".opt")) {
    elem.addEventListener("click", function (e) {
        tombolAksi.opt(e.target.innerText);
    })
}

get(".clear").addEventListener("click", function () {
    tombolAksi.clear();
})

get(".hasil").addEventListener("click", function () {
    tombolAksi.hasil();
})

get(".hapus").addEventListener("click", function () {
    tombolAksi.hapus();
})




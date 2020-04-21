const barem = {
  less36kva: {
    cg: {
      selfproducer: {
        card: 18.72,
        cu: 16.32
      },
      other: {
        card: 15.12,
        cu: 12.72
      }
    },
    cc: {
      rented: 20.40,
      owned: 9.60,
      none: 1.32
    },
    cs: {
      selfproducer: {
        cu4: {
          autoproduit: {
            pcoef: 3.60,
            ecoef: {
              hph: 2.98,
              hch: 2.24,
              hpb: 0.77,
              hcb: 0.73
            }
          },
          alloproduit: {
            pcoef: 3.60,
            ecoef: {
              hph: 7.27,
              hch: 5.59,
              hpb: 2.07,
              hcb: 1.10
            }
          }
        },
        mu4: {
          autoproduit: {
            pcoef: 6.12,
            ecoef: {
              hph: 2.75,
              hch: 0.51,
              hpb: 0.37,
              hcb: 0.02
            }
          },
          alloproduit: {
            pcoef: 6.12,
            ecoef: {
              hph: 5.61,
              hch: 3.91,
              hpb: 1.94,
              hcb: 1.10
            }
          }
        }
      },
      other: {
        cu4: {
          pcoef: 4.80,
          ecoef: {
            hph: 7.57,
            hch: 3.77,
            hpb: 1.93,
            hcb: 1.39
          }
        },
        mu4: {
          pcoef: 6.96,
          ecoef: {
            hph: 5.79,
            hch: 3.34,
            hpb: 1.35,
            hcb: 1.01
          }
        },
        cu: {
          pcoef: 5.40,
          ecoef: 3.77
        },
        lu: {
          pcoef: 60.60,
          ecoef: 1.43
        },
        mudt: {
          pcoef: 7.92,
          ecoef: {
            hph: 4.00,
            hch: 2.45,
            hpb: 4.00,
            hcb: 2.45
          }
        }

      }
    }
  },
  more36kva: {
    cg: {
      selfproducer: {
        card: 260.28,
        cu: 230.20
      },
      other: {
        card: 208.80,
        cu: 180.84
      }
    },
    cc: {
      rented: 426.36,
      owned: 152.16,
      none: 152.16
    },
    cs: {
      selfproducer: {
        cu: {
          autoproduit: {
            pcoef: {
              hph: 8.31,
              hch: 8.30,
              hpb: 6.45,
              hcb: 4.01
            },
            ecoef: {
              hph: 2.93,
              hch: 2.18,
              hpb: 1.54,
              hcb: 0.12
            }
          },
          alloproduit: {
            pcoef: {
              hph: 8.31,
              hch: 8.30,
              hpb: 6.45,
              hcb: 4.01
            },
            ecoef: {
              hph: 5.09,
              hch: 3.62,
              hpb: 3.22,
              hcb: 0.78
            }
          }
        },
        lu: {
          autoproduit: {
            pcoef: {
              hph: 20.03,
              hch: 15.22,
              hpb: 11.48,
              hcb: 8.02
            },
            ecoef: {
              hph: 2.10,
              hch: 2.07,
              hpb: 1.40,
              hcb: 0.08
            }
          },
          alloproduit: {
            pcoef: {
              hph: 20.03,
              hch: 15.22,
              hpb: 11.48,
              hcb: 8.02
            },
            ecoef: {
              hph: 4.76,
              hch: 3.46,
              hpb: 2.37,
              hcb: 0.12
            }
          }
        }
      },
      other: {
        cu: {
          pcoef: {
            hph: 10.20,
            hch: 5.24,
            hpb: 3.82,
            hcb: 1.15
          },
          ecoef: {
            hph: 4.91,
            hch: 3.01,
            hpb: 2.22,
            hcb: 1.83
          }
        },
        lu: {
          pcoef: {
            hph: 18.72,
            hch: 11.14,
            hpb: 9.13,
            hcb: 3.79
          },
          ecoef: {
            hph: 4.27,
            hch: 2.87,
            hpb: 1.93,
            hcb: 1.78
          }
        }
      }
    }
  },
  cta:27.04
}

export class Turpe {
  constructor(cg,
    cc,
    csp,
    cse,
    cmdps) {
    this.cg = cg;
    this.cc = cc;
    this.csp = csp;
    this.cse = cse;
    this.cmdps = cmdps;
    this.cta = (cg+cc+csp)*(barem.cta/100);
    this.sum = (cg+cc+csp+cse+cmdps+this.cta).toFixed(2);
  }
}

export class CalculTurpe {
  constructor(voltagedomain,
    powersuscription,
    metertype,
    contracttype,
    fairoption,
    consumptiondata,
    newuses) {
    this.voltagedomain = voltagedomain;
    this.powersuscription = powersuscription;
    this.metertype = metertype;
    this.contracttype = contracttype;
    this.fairoption = fairoption;
    this.consumptiondata = consumptiondata;
    this.newuses = newuses;
  }

  evaluate() {
    if(this.powersuscription === "less36kva"){
      if(this.metertype === "rented"){
        if(this.contracttype === "CU"){

          if(this.fairoption === "cusdt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.rented,
                              barem.less36kva.cs.other.cu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.cu.ecoef*this.consumptiondata.energy,
                              0);
          }else if(this.fairoption === "cuqpt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.rented,
                              barem.less36kva.cs.other.cu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.cu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "mudpt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.rented,
                              barem.less36kva.cs.other.mudt.pcoef*this.consumptiondata.powermudpt,
                              (1/100) * barem.less36kva.cs.other.mudt.ecoef.hph*this.consumptiondata.echp
                            + (1/100) * barem.less36kva.cs.other.mudt.ecoef.hch*this.consumptiondata.ecec,
                              0);

          }else if(this.fairoption === "muqpt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.rented,
                              barem.less36kva.cs.other.mu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.mu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "lusdt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.rented,
                              barem.less36kva.cs.other.lu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.lu.ecoef*this.consumptiondata.energy,
                              0);
          }

        }else{

          if(this.fairoption === "cusdt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.rented,
                              barem.less36kva.cs.other.cu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.cu.ecoef*this.consumptiondata.energy,
                              0);
          }else if(this.fairoption === "cuqpt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.rented,
                              barem.less36kva.cs.other.cu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.cu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "mudpt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.rented,
                              barem.less36kva.cs.other.mudt.pcoef*this.consumptiondata.powermudpt,
                              (1/100) * barem.less36kva.cs.other.mudt.ecoef.hph*this.consumptiondata.echp
                            + (1/100) * barem.less36kva.cs.other.mudt.ecoef.hch*this.consumptiondata.ecec,
                              0);

          }else if(this.fairoption === "muqpt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.rented,
                              barem.less36kva.cs.other.mu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.mu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "lusdt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.rented,
                              barem.less36kva.cs.other.lu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.lu.ecoef*this.consumptiondata.energy,
                              0);
          }

        }
      }else if(this.metertype === "owned"){
        if(this.contracttype === "CU"){

          if(this.fairoption === "cusdt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.owned,
                              barem.less36kva.cs.other.cu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.cu.ecoef*this.consumptiondata.energy,
                              0);
          }else if(this.fairoption === "cuqpt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.owned,
                              barem.less36kva.cs.other.cu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.cu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "mudpt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.owned,
                              barem.less36kva.cs.other.mudt.pcoef*this.consumptiondata.powermudpt,
                              (1/100) * barem.less36kva.cs.other.mudt.ecoef.hph*this.consumptiondata.echp
                            + (1/100) * barem.less36kva.cs.other.mudt.ecoef.hch*this.consumptiondata.ecec,
                              0);

          }else if(this.fairoption === "muqpt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.owned,
                              barem.less36kva.cs.other.mu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.mu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "lusdt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.owned,
                              barem.less36kva.cs.other.lu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.lu.ecoef*this.consumptiondata.energy,
                              0);
          }

        }else{

          if(this.fairoption === "cusdt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.owned,
                              barem.less36kva.cs.other.cu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.cu.ecoef*this.consumptiondata.energy,
                              0);
          }else if(this.fairoption === "cuqpt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.owned,
                              barem.less36kva.cs.other.cu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.cu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "mudpt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.owned,
                              barem.less36kva.cs.other.mudt.pcoef*this.consumptiondata.powermudpt,
                              (1/100) * barem.less36kva.cs.other.mudt.ecoef.hph*this.consumptiondata.echp
                            + (1/100) * barem.less36kva.cs.other.mudt.ecoef.hch*this.consumptiondata.ecec,
                              0);

          }else if(this.fairoption === "muqpt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.owned,
                              barem.less36kva.cs.other.mu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.mu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "lusdt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.owned,
                              barem.less36kva.cs.other.lu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.lu.ecoef*this.consumptiondata.energy,
                              0);
          }

        }
      }else{
        if(this.contracttype === "CU"){

          if(this.fairoption === "cusdt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.none,
                              barem.less36kva.cs.other.cu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.cu.ecoef*this.consumptiondata.energy,
                              0);
          }else if(this.fairoption === "cuqpt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.none,
                              barem.less36kva.cs.other.cu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.cu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "mudpt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.none,
                              barem.less36kva.cs.other.mudt.pcoef*this.consumptiondata.powermudpt,
                              (1/100) * barem.less36kva.cs.other.mudt.ecoef.hph*this.consumptiondata.echp
                            + (1/100) * barem.less36kva.cs.other.mudt.ecoef.hch*this.consumptiondata.ecec,
                              0);

          }else if(this.fairoption === "muqpt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.none,
                              barem.less36kva.cs.other.mu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.mu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "lusdt"){
            return new Turpe( barem.less36kva.cg.other.cu,
                              barem.less36kva.cc.none,
                              barem.less36kva.cs.other.lu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.lu.ecoef*this.consumptiondata.energy,
                              0);
          }

        }else{

          if(this.fairoption === "cusdt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.none,
                              barem.less36kva.cs.other.cu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.cu.ecoef*this.consumptiondata.energy,
                              0);
          }else if(this.fairoption === "cuqpt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.none,
                              barem.less36kva.cs.other.cu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.cu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.cu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "mudpt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.none,
                              barem.less36kva.cs.other.mudt.pcoef*this.consumptiondata.powermudpt,
                              (1/100) * barem.less36kva.cs.other.mudt.ecoef.hph*this.consumptiondata.echp
                            + (1/100) * barem.less36kva.cs.other.mudt.ecoef.hch*this.consumptiondata.ecec,
                              0);

          }else if(this.fairoption === "muqpt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.none,
                              barem.less36kva.cs.other.mu4.pcoef*this.consumptiondata.powercuqpt,
                              (1/100) * barem.less36kva.cs.other.mu4.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.less36kva.cs.other.mu4.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "lusdt"){
            return new Turpe( barem.less36kva.cg.other.card,
                              barem.less36kva.cc.none,
                              barem.less36kva.cs.other.lu.pcoef*this.consumptiondata.powercusdt,
                              (1/100) * barem.less36kva.cs.other.lu.ecoef*this.consumptiondata.energy,
                              0);
          }

        }
      }
    }else if(this.powersuscription === "more36kva"){
      if(this.metertype === "rented"){
        if(this.contracttype === "CU"){

          if(this.fairoption === "cuadt4c"){
            return new Turpe( barem.more36kva.cg.other.cu,
                              barem.more36kva.cc.rented,
                              barem.more36kva.cs.other.cu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.cu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.cu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.cu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.cu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "luadt4c"){
            return new Turpe( barem.more36kva.cg.other.cu,
                              barem.more36kva.cc.rented,
                              barem.more36kva.cs.other.lu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.lu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.lu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.lu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.lu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }

        }else{

          if(this.fairoption === "cuadt4c"){
            return new Turpe( barem.more36kva.cg.other.card,
                              barem.more36kva.cc.rented,
                              barem.more36kva.cs.other.cu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.cu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.cu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.cu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.cu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "luadt4c"){
            return new Turpe( barem.more36kva.cg.other.card,
                              barem.more36kva.cc.rented,
                              barem.more36kva.cs.other.lu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.lu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.lu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.lu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.lu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }

        }
      }else if(this.metertype === "owned"){
        if(this.contracttype === "CU"){

          if(this.fairoption === "cuadt4c"){
            return new Turpe( barem.more36kva.cg.other.cu,
                              barem.more36kva.cc.owned,
                              barem.more36kva.cs.other.cu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.cu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.cu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.cu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.cu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "luadt4c"){
            return new Turpe( barem.more36kva.cg.other.cu,
                              barem.more36kva.cc.owned,
                              barem.more36kva.cs.other.lu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.lu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.lu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.lu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.lu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }

        }else{

          if(this.fairoption === "cuadt4c"){
            return new Turpe( barem.more36kva.cg.other.card,
                              barem.more36kva.cc.owned,
                              barem.more36kva.cs.other.cu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.cu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.cu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.cu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.cu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "luadt4c"){
            return new Turpe( barem.more36kva.cg.other.card,
                              barem.more36kva.cc.owned,
                              barem.more36kva.cs.other.lu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.lu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.lu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.lu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.lu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }

        }
      }else{
        if(this.contracttype === "CU"){

          if(this.fairoption === "cuadt4c"){
            return new Turpe( barem.more36kva.cg.other.cu,
                              barem.more36kva.cc.none,
                              barem.more36kva.cs.other.cu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.cu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.cu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.cu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.cu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "luadt4c"){
            return new Turpe( barem.more36kva.cg.other.cu,
                              barem.more36kva.cc.none,
                              barem.more36kva.cs.other.lu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.lu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.lu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.lu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.lu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }

        }else{

          if(this.fairoption === "cuadt4c"){
            return new Turpe( barem.more36kva.cg.other.card,
                              barem.more36kva.cc.none,
                              barem.more36kva.cs.other.cu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.cu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.cu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.cu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.cu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.cu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }else if(this.fairoption === "luadt4c"){
            return new Turpe( barem.more36kva.cg.other.card,
                              barem.more36kva.cc.none,
                              barem.more36kva.cs.other.lu.pcoef.hph*this.consumptiondata.pshph
                            + barem.more36kva.cs.other.lu.pcoef.hch*this.consumptiondata.pshch
                            + barem.more36kva.cs.other.lu.pcoef.hpb*this.consumptiondata.pshpe
                            + barem.more36kva.cs.other.lu.pcoef.hcb*this.consumptiondata.pshce,
                              (1/100) * barem.more36kva.cs.other.lu.ecoef.hph*this.consumptiondata.echph
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hch*this.consumptiondata.echch
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hpb*this.consumptiondata.echpe
                            + (1/100) * barem.more36kva.cs.other.lu.ecoef.hcb*this.consumptiondata.echce,
                              0);

          }

        }
      }
    }
    return null;
  }
}

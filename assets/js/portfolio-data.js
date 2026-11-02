// ============================================
// KINARYA — portfolio-data.js
// Daftar karya yang tampil di bagian "Karya" (halaman utama).
//
// Tiap ID diambil dari link Google Drive (bagian antara /d/ dan /view).
// Pastikan sharing-nya "Anyone with the link".
//
// Mau nambah karya baru: tambahin ID-nya ke daftar "ids" di grup yang sesuai
// (jangan lupa koma di antara ID). Mau grup baru: salin satu blok { group, ids }.
// ============================================

const PORTFOLIO = {
  rigging: [
    { group: "VTuber Pet", ids: [
      "1oRF8DzHby2nBMTMfrNeTq20_oWUGVQ1_",
      "17nOoXYi7SB69mk3ARhiP6rzn7Qus9Ml0",
      "1zGtLvLhQCpeJLzgSjTeeHdU65yG3QcEA",
      "1Qs61c8uo4SDSVQW91Ma9YweBLooNKsLr"
    ]},
    { group: "VTuber Model", ids: [
      "1hfc1-IIIshrGfZOIv2kGZKXYNe99Qbmg",
      "1ynCjSOKq1RoZ_wSKhFCSUcLr-OlyqIcR",
      "1GwSOVyD6xE2k8d4yIe-4A6OZrlXHXmy9",
      "1_jcrxpe_vPROaUrd2kyTgUjmT3ds-Ss5"
    ]},
    { group: "VTuber Puppet", ids: [
      "108pdpVL3zt7yq9zTgkERz-hT6c55Yi38",
      "1vqjZ4gYTVV0IGAsEUymmjNfs4gYkLbCE"
    ]},
    { group: "Overlay · Starting Soon", ids: [
      "17N9k8f9gCmNDJK-QUCgQGwCVlZ3Y_nro",
      "1IMQCWBkduDrPThcvHvL3jJrG04uTgYpI",
      "11SdAAbNTiUMthYKqoLf3RbG2JGVycmyK",
      "1Qt67Tp7Jpn9vENSO_1mxrzJiGWI77ib5",
      "1_3USYri6g_pfx-FxxAWbYgekrCNQ71ZC",
      "16ewDmTFFZ6MNXzYJyNi2TOTSpTDKFhbs",
      "19v-_p0hI7QtTF2F6x9qtHAlFOhSJNNqJ",
      "1RU3CN3aNIWa-g7Q5fAETbMdTcgEp40xL",
      "1uxU-i12K32LT-rUulphPD6uRd3I4OinO",
      "1DuxoHGPEwJP0qTQvfmpaEs7dOP0ZS5kE",
      "1W9zgWlcqdhPdY7qjoZdzgm0DQ8WwBrSk",
      "14nLXHIH5G0lSS5RfF902pv2Hy4vT7-8g",
      "1uCeJa4lahN1FWWME_Kgzvcka2l1dsja5",
      "1oWiX7CmuNpyYzqa-cUN9VlyP8OOTPrXq",
      "1nJwC-ibKtD0VezuBWU3R7uZbEq48FIbL"
    ]},
    { group: "Overlay · Be Right Back", ids: [
      "1RLfrRH8AY4BRPvd6z33CcP6e-lKWwX3y",
      "1IHCTsLJoRVIEKYiNwALPa4B8ZTwaFVzo",
      "1iO29ZgdLdRlIh_pL2Odu2VGxJv-P1gaP"
    ]},
    { group: "Overlay · Stream End", ids: [
      "1-LsrFZBJKUzVxbo0zZ6BgrAeFivxlLxL",
      "1n8vHosMGhGBNB6nIjanxdDLLkrJUPBmT"
    ]},
    { group: "Overlay · Animation", ids: [
      "1YAHuCMmDYUEerw0DcXGPeKbuQ_N3rb2Y"
    ]},
    { group: "Overlay · Icon", ids: [
      "1nXCRti-WkUloUZ2v6-UhoQWY2xb1ig09",
      "1NxMFZDbS03M8ZcrNpUZPAO1zb684KAdH"
    ]},
    { group: "Overlay · Panels", ids: [
      "18Xx5jYR-R7ll6oDrYK4XqPYLo5gSqdk2"
    ]},
    { group: "Overlay · Background", ids: [
      "12WfSdgpD7eS8C89xsKYznMdXTtOtHHXr",
      "1vyvrkjYTTboTyZ3n5VH_JPi1EQAfwmfI",
      "1yhxZLQBKQ2W0SwZ0hORJ1UwfZ2982QAi",
      "1LZx71xxdCegf6P3jf94m36Am3Lc4jebJ",
      "132B_WVGFKBl3W5NLifr52Q5MrxJtKeb9",
      "1g5mW1E2RAmgtBFYFXbVR9iOZKUu5i1hV",
      "1IzTSrEpG_YAEgUcINh9C4S_zZoBtd1OJ",
      "1dbHgKc71kOWNJh1E6-6MwDtx08Fbeyag"
    ]},
    { group: "Overlay · Boobs Overlays", ids: [
      "13LGolkyX-SXVfUKANGwhjjYJLWC8rktT",
      "1fqSNR_24mPLQOqG_prb_i07ydV5iDAYv",
      "1Yi_sWJzfex0oWXUp2MoMEAUib_REgjSQ",
      "1yu4xAlGMzhoV0dh94B7EJHZ0Qs1n2soB",
      "1rpbzqnny607JG2QFO0_1vWHz_J_6hnBW",
      "15hakSa5Dr-2ZiCi9srUwpBeHspX7ki0y",
      "1G2r4OnN5LIyCkFiD4hEYO15BZID7DwTr"
    ]},
    { group: "Animasi Logo", ids: [
      "1V4NTCabxTjG4YE5wHgSx0zzCaPNxc4Fq",
      "15QpOw8UM0wi9G9C3pe4IwW0ZjY3OSUpF",
      "17dfUF2EM1aHhy6kcvjer5zjYMY3CyzLk"
    ]},
    { group: "Animasi Emote", ids: [
      "1gbqWqjKox0vdWj8byh--sySdWqE5qjux",
      "18pr7FrgtKNvja6hkDnBRCMROaMHGAqDR",
      "1AL5nZmd2R7pVLeS0yqSAS3oprVNHYwb9",
      "1TWvyPbp8TCvJ2bRSaWVTYVZHHRMndtNQ",
      "1imTG79VZC3XJWDWGegAhAdHaC5eUCaE-",
      "1BQgReGQbVVzR686767h5p01L4aXzzQgq",
      "1EKJS_1jbkROmWVUmNEpqM2TyrmXhldMm",
      "1ICxbldVf7t98lXIplkJSE5U6wu_VZy4J",
      "1TxrEegRxeatDxNVS_UoqXh_OKTdvNmiV",
      "1N_AvBFqxDa2u7eb_gUpbWlNIMqWZyXQ5",
      "1qDLeRtKg1Ab6Tt6xKizjNF8_QFxrY1hh",
      "16Tcime2xw2i-bjeK8lmC3X27EA23lV5d",
      "1LnygUtwcjrMF69t5GhUWqvdrRCdwMMoK",
      "1ES4m6zIH53k2lEeABgP1qarRtpJC77yZ",
      "1w6W4aOob2z-HHhDSI7aKNAaRhl4Y_dxP",
      "1Tqxi3SQ3QJ-J5BSvPR_BuEHKngoJ9NxZ",
      "1al_KY2MZSNBQlgQbEdudfIKHN4zckvBL",
      "1UCzbNEzM4WVLUaxkLxDj4uvRgb1u_Axf",
      "1JTt6rvHgjX28o_TymSMaX_2R7kQae1oX",
      "1MOwxEdLWeAYTzEe9OzsMTozOh6SMufYF",
      "1vwW6l_2MDb_EqIluISei32Gw235x53wV",
      "1UE56Oida2pSo51zm9ZOjOixIPEsgr7BK"
    ]},
    { group: "Animasi Banner", ids: [
      "169kJNAbCIqd-5V2cCiF9LI_8B_vQwebT",
      "1dfRKvHzhkXIGXr0-0KW2bxTb-8Cf-GDy",
      "1Nko7LCEYPRPux8H1kXXZ39zJ4uaSRcfh",
      "1UNcT2rUJLAbmWTdVC2BTCwMOxGdFwMnh",
      "1uGMOapRycQC9DhMRMF_Xkk3Wx5RmKBCJ",
      "19E_YkNds6BMV2FmEY0jBBR9gJgmW6zES",
      "1XanpOSOpJ_WFWjXhQ2CSh7TJjsfZAAc-"
    ]},
    { group: "Animasi Illustration", ids: [
      "1RqWI8FLUr2m-J7ET1kt4SaYYRZGrCMHA",
      "1ebxH_mKvnXgUumgU9i9p-i2w6uKrOEuE",
      "1HsMSKHIkUtmkfYIztYjaQPgjwyhmnJlL",
      "14y98UWuVvfMurUbSrEaXXFttw84HqEHl",
      "1LUdneTxKeCZszCzwtOmEPXiiKK4mYF1Q",
      "1RPwTj0TE77awQR3UM6wZUivOVADFwOwD",
      "1jylcy5za_LhsvAOR2H0itKJjJ1XafYEu",
      "1uyr1ZNde-whQKUDKgIAAqWKKUvbsY3_7"
    ]}
  ],
  vroid: [
    { group: "VRoid · Modeling", ids: [
      "18Ct4HhJ6MUdgL7ti0I-s8Mt1P6nfzALg"
    ]},
    { group: "VRoid · Teksturing", ids: [
      "1dHQ1Es9Ge5bFn2k_bz6aUvm5D43od8kF"
    ]},
    { group: "VRoid · Rigging", ids: [
      "1t0uISgBCSG0HD88ascqzmHFVLUBc4KfA",
      "17_n0YrHX9dryrojG1XfNR09DYg6h1YXJ",
      "1N_X_QymwWCv3wZTB2k3vWA64Gp-wC3VI",
      "1dk2Q1CWanMCtOEaSaDbrV3iHfFS7ioeG",
      "1-da-M4h9aF7aI79mamV0spmNS03nVlNR",
      "1B9XL3XQjWr_czyPxD02yUhjHPjQV6Bmx",
      "1jbX0XI5zX97bMBe7yZL3W_p7TadU8GBt",
      "1_5FeG7WmM6pScIgV5kPi1s9o_AkoCJOm",
      "1CxeDnCRBAOX8PdGrQtfZ85Tpa82Vwjoh",
      "1wVUAJ4aZgvBDHGd59gYCIAKEXsh50yFK",
      "12JZK-p-DYp2BGgxKIUhbIbVYPvqzcD8F",
      "1VE0NxS_-bI6Goe_hSYg_q7IPPL8WacSG",
      "1ZX0mmM_0UJKcrlDbeG7abcVwNS88QyuJ",
      "1IuVdLw5RR7yCuvuyDYvNuWNFuajuyPX8",
      "1v6D5ty3LJ4EyFSVkFMsrFpD3bQpIJC7r"
    ]}
  ]
};

const districts = [
  {
    id: 2,
    name: "Quận Hoàn Kiếm",
    provinceId: 50
  },
  {
    id: 7,
    name: "Quận Hai Bà Trưng",
    provinceId: 50
  },
  {
    id: 1,
    name: "Quận Ba Đình",
    provinceId: 50
  },
  {
    id: 6,
    name: "Quận Đống Đa",
    provinceId: 50
  },
  {
    id: 5,
    name: "Quận Cầu Giấy",
    provinceId: 50
  },
  {
    id: 9,
    name: "Quận Thanh Xuân",
    provinceId: 50
  },
  {
    id: 3,
    name: "Quận Tây Hồ",
    provinceId: 50
  },
  {
    id: 8,
    name: "Quận Hoàng Mai",
    provinceId: 50
  },
  {
    id: 13,
    name: "Quận Nam Từ Liêm",
    provinceId: 50
  },
  {
    id: 4,
    name: "Quận Long Biên",
    provinceId: 50
  },
  {
    id: 698,
    name: "Quận Bắc Từ Liêm",
    provinceId: 50
  },
  {
    id: 184,
    name: "Quận Hà Đông",
    provinceId: 50
  },
  {
    id: 186,
    name: "Huyện Ba Vì",
    provinceId: 50
  },
  {
    id: 196,
    name: "Huyện Ứng Hòa",
    provinceId: 50
  },
  {
    id: 172,
    name: "Huyện Mê Linh",
    provinceId: 50
  },
  {
    id: 197,
    name: "Huyện Mỹ Đức",
    provinceId: 50
  },
  {
    id: 195,
    name: "Huyện Phú Xuyên",
    provinceId: 50
  },
  {
    id: 187,
    name: "Huyện Phúc Thọ",
    provinceId: 50
  },
  {
    id: 190,
    name: "Huyện Quốc Oai",
    provinceId: 50
  },
  {
    id: 192,
    name: "Huyện Chương Mỹ",
    provinceId: 50
  },
  {
    id: 188,
    name: "Huyện Đan Phượng",
    provinceId: 50
  },
  {
    id: 11,
    name: "Huyện Đông Anh",
    provinceId: 50
  },
  {
    id: 12,
    name: "Huyện Gia Lâm",
    provinceId: 50
  },
  {
    id: 10,
    name: "Huyện Sóc Sơn",
    provinceId: 50
  },
  {
    id: 189,
    name: "Huyện Hoài Đức",
    provinceId: 50
  },
  {
    id: 185,
    name: "Thị xã Sơn Tây",
    provinceId: 50
  },
  {
    id: 191,
    name: "Huyện Thạch Thất",
    provinceId: 50
  },
  {
    id: 193,
    name: "Huyện Thanh Oai",
    provinceId: 50
  },
  {
    id: 14,
    name: "Huyện Thanh Trì",
    provinceId: 50
  },
  {
    id: 194,
    name: "Huyện Thường Tín",
    provinceId: 50
  },
  {
    id: 525,
    name: "Thành phố Biên Hòa",
    provinceId: 48
  },
  {
    id: 526,
    name: "Thành phố Long Khánh",
    provinceId: 48
  },
  {
    id: 531,
    name: "Huyện Thống Nhất",
    provinceId: 48
  },
  {
    id: 527,
    name: "Huyện Tân Phú",
    provinceId: 48
  },
  {
    id: 529,
    name: "Huyện Định Quán",
    provinceId: 48
  },
  {
    id: 532,
    name: "Huyện Cẩm Mỹ",
    provinceId: 48
  },
  {
    id: 528,
    name: "Huyện Vĩnh Cửu",
    provinceId: 48
  },
  {
    id: 534,
    name: "Huyện Xuân Lộc",
    provinceId: 48
  },
  {
    id: 533,
    name: "Huyện Long Thành",
    provinceId: 48
  },
  {
    id: 535,
    name: "Huyện Nhơn Trạch",
    provinceId: 48
  },
  {
    id: 530,
    name: "Huyện Trảng Bom",
    provinceId: 48
  },
  {
    id: 518,
    name: "Thành phố Thủ Dầu Một",
    provinceId: 47
  },
  {
    id: 523,
    name: "Thành phố Dĩ An",
    provinceId: 47
  },
  {
    id: 524,
    name: "Thành phố Thuận An",
    provinceId: 47
  },
  {
    id: 520,
    name: "Thị xã Bến Cát",
    provinceId: 47
  },
  {
    id: 522,
    name: "Thị xã Tân Uyên",
    provinceId: 47
  },
  {
    id: 100003,
    name: "Huyện Bắc Tân Uyên",
    provinceId: 47
  },
  {
    id: 100002,
    name: "Huyện Bàu Bàng",
    provinceId: 47
  },
  {
    id: 519,
    name: "Huyện Dầu Tiếng",
    provinceId: 47
  },
  {
    id: 521,
    name: "Huyện Phú Giáo",
    provinceId: 47
  },
  {
    id: 557,
    name: "Quận 4",
    provinceId: 1
  },
  {
    id: 560,
    name: "Quận 8",
    provinceId: 1
  },
  {
    id: 562,
    name: "Quận 7",
    provinceId: 1
  },
  {
    id: 559,
    name: "Quận 6",
    provinceId: 1
  },
  {
    id: 558,
    name: "Quận 5",
    provinceId: 1
  },
  {
    id: 554,
    name: "Quận 3",
    provinceId: 1
  },
  {
    id: 553,
    name: "Quận 2",
    provinceId: 1
  },
  {
    id: 556,
    name: "Quận 11",
    provinceId: 1
  },
  {
    id: 555,
    name: "Quận 10",
    provinceId: 1
  },
  {
    id: 544,
    name: "Quận 1",
    provinceId: 1
  },
  {
    id: 551,
    name: "Quận Tân Phú",
    provinceId: 1
  },
  {
    id: 550,
    name: "Quận Tân Bình",
    provinceId: 1
  },
  {
    id: 552,
    name: "Quận Phú Nhuận",
    provinceId: 1
  },
  {
    id: 548,
    name: "Quận Gò Vấp",
    provinceId: 1
  },
  {
    id: 549,
    name: "Quận Bình Thạnh",
    provinceId: 1
  },
  {
    id: 561,
    name: "Quận Bình Tân",
    provinceId: 1
  },
  {
    id: 546,
    name: "Quận Thủ Đức",
    provinceId: 1
  },
  {
    id: 545,
    name: "Quận 12",
    provinceId: 1
  },
  {
    id: 547,
    name: "Quận 9",
    provinceId: 1
  },
  {
    id: 565,
    name: "Huyện Bình Chánh",
    provinceId: 1
  },
  {
    id: 566,
    name: "Huyện Nhà Bè",
    provinceId: 1
  },
  {
    id: 564,
    name: "Huyện Hóc Môn",
    provinceId: 1
  },
  {
    id: 563,
    name: "Huyện Củ Chi",
    provinceId: 1
  },
  {
    id: 567,
    name: "Huyện Cần Giờ",
    provinceId: 1
  },
  {
    id: 100012,
    name: "Huyện Cao Lãnh",
    provinceId: 56
  },
  {
    id: 689,
    name: "Thành phố Cà Mau",
    provinceId: 63
  },
  {
    id: 691,
    name: "Huyện Thới Bình",
    provinceId: 63
  },
  {
    id: 692,
    name: "Huyện Trần Văn Thời",
    provinceId: 63
  },
  {
    id: 693,
    name: "Huyện Cái Nước",
    provinceId: 63
  },
  {
    id: 694,
    name: "Huyện Đầm Dơi",
    provinceId: 63
  },
  {
    id: 695,
    name: "Huyện Năm Căn",
    provinceId: 63
  },
  {
    id: 697,
    name: "Huyện Ngọc Hiển",
    provinceId: 63
  },
  {
    id: 696,
    name: "Huyện Phú Tân",
    provinceId: 63
  },
  {
    id: 690,
    name: "Huyện U Minh",
    provinceId: 63
  },
  {
    id: 682,
    name: "Thành phố Bạc Liêu",
    provinceId: 62
  },
  {
    id: 686,
    name: "Thị xã Giá Rai",
    provinceId: 62
  },
  {
    id: 688,
    name: "Huyện Hòa Bình",
    provinceId: 62
  },
  {
    id: 685,
    name: "Huyện Vĩnh Lợi",
    provinceId: 62
  },
  {
    id: 683,
    name: "Huyện Hồng Dân",
    provinceId: 62
  },
  {
    id: 687,
    name: "Huyện Đông Hải",
    provinceId: 62
  },
  {
    id: 684,
    name: "Huyện Phước Long",
    provinceId: 62
  },
  {
    id: 671,
    name: "Thành phố Sóc Trăng",
    provinceId: 61
  },
  {
    id: 680,
    name: "Thị xã Vĩnh Châu",
    provinceId: 61
  },
  {
    id: 678,
    name: "Thị xã Ngã Năm",
    provinceId: 61
  },
  {
    id: 672,
    name: "Huyện Châu Thành",
    provinceId: 61
  },
  {
    id: 677,
    name: "Huyện Mỹ Xuyên",
    provinceId: 61
  },
  {
    id: 674,
    name: "Huyện Mỹ Tú",
    provinceId: 61
  },
  {
    id: 676,
    name: "Huyện Long Phú",
    provinceId: 61
  },
  {
    id: 679,
    name: "Huyện Thạnh Trị",
    provinceId: 61
  },
  {
    id: 673,
    name: "Huyện Kế Sách",
    provinceId: 61
  },
  {
    id: 681,
    name: "Huyện Trần Đề",
    provinceId: 61
  },
  {
    id: 675,
    name: "Huyện Cù Lao Dung",
    provinceId: 61
  },
  {
    id: 665,
    name: "Thành phố Ngã Bảy",
    provinceId: 60
  },
  {
    id: 664,
    name: "Thành phố Vị Thanh",
    provinceId: 60
  },
  {
    id: 670,
    name: "Thị xã Long Mỹ",
    provinceId: 60
  },
  {
    id: 669,
    name: "Huyện Vị Thủy",
    provinceId: 60
  },
  {
    id: 666,
    name: "Huyện Châu Thành A",
    provinceId: 60
  },
  {
    id: 668,
    name: "Huyện Phụng Hiệp",
    provinceId: 60
  },
  {
    id: 667,
    name: "Huyện Châu Thành",
    provinceId: 60
  },
  {
    id: 658,
    name: "Quận Cái Răng",
    provinceId: 59
  },
  {
    id: 657,
    name: "Quận Bình Thủy",
    provinceId: 59
  },
  {
    id: 655,
    name: "Quận Ninh Kiều",
    provinceId: 59
  },
  {
    id: 656,
    name: "Quận Ô Môn",
    provinceId: 59
  },
  {
    id: 659,
    name: "Quận Thốt Nốt",
    provinceId: 59
  },
  {
    id: 662,
    name: "Huyện Phong Điền",
    provinceId: 59
  },
  {
    id: 661,
    name: "Huyện Cờ Đỏ",
    provinceId: 59
  },
  {
    id: 660,
    name: "Huyện Vĩnh Thạnh",
    provinceId: 59
  },
  {
    id: 663,
    name: "Huyện Thới Lai",
    provinceId: 59
  },
  {
    id: 641,
    name: "Thành phố Hà Tiên",
    provinceId: 58
  },
  {
    id: 640,
    name: "Thành phố Rạch Giá",
    provinceId: 58
  },
  {
    id: 647,
    name: "Huyện Gò Quao",
    provinceId: 58
  },
  {
    id: 648,
    name: "Huyện An Biên",
    provinceId: 58
  },
  {
    id: 649,
    name: "Huyện An Minh",
    provinceId: 58
  },
  {
    id: 646,
    name: "Huyện Giồng Riềng",
    provinceId: 58
  },
  {
    id: 651,
    name: "Huyện Phú Quốc",
    provinceId: 58
  },
  {
    id: 653,
    name: "Huyện U Minh Thượng",
    provinceId: 58
  },
  {
    id: 654,
    name: "Huyện Giang Thành",
    provinceId: 58
  },
  {
    id: 652,
    name: "Huyện Kiên Hải",
    provinceId: 58
  },
  {
    id: 650,
    name: "Huyện Vĩnh Thuận",
    provinceId: 58
  },
  {
    id: 644,
    name: "Huyện Tân Hiệp",
    provinceId: 58
  },
  {
    id: 642,
    name: "Huyện Kiên Lương",
    provinceId: 58
  },
  {
    id: 643,
    name: "Huyện Hòn Đất",
    provinceId: 58
  },
  {
    id: 645,
    name: "Huyện Châu Thành",
    provinceId: 58
  },
  {
    id: 630,
    name: "Thành phố Châu Đốc",
    provinceId: 57
  },
  {
    id: 629,
    name: "Thành phố Long Xuyên",
    provinceId: 57
  },
  {
    id: 632,
    name: "Thị xã Tân Châu",
    provinceId: 57
  },
  {
    id: 636,
    name: "Huyện Tri Tôn",
    provinceId: 57
  },
  {
    id: 631,
    name: "Huyện An Phú",
    provinceId: 57
  },
  {
    id: 638,
    name: "Huyện Chợ Mới",
    provinceId: 57
  },
  {
    id: 634,
    name: "Huyện Châu Phú",
    provinceId: 57
  },
  {
    id: 639,
    name: "Huyện Thoại Sơn",
    provinceId: 57
  },
  {
    id: 637,
    name: "Huyện Châu Thành",
    provinceId: 57
  },
  {
    id: 635,
    name: "Huyện Tịnh Biên",
    provinceId: 57
  },
  {
    id: 633,
    name: "Huyện Phú Tân",
    provinceId: 57
  },
  {
    id: 617,
    name: "Thành phố Cao Lãnh",
    provinceId: 56
  },
  {
    id: 618,
    name: "Thành phố Sa Đéc",
    provinceId: 56
  },
  {
    id: 619,
    name: "Thị xã Hồng Ngự",
    provinceId: 56
  },
  {
    id: 623,
    name: "Huyện Tháp Mười",
    provinceId: 56
  },
  {
    id: 620,
    name: "Huyện Tân Hồng",
    provinceId: 56
  },
  {
    id: 621,
    name: "Huyện Hồng Ngự",
    provinceId: 56
  },
  {
    id: 626,
    name: "Huyện Lấp Vò",
    provinceId: 56
  },
  {
    id: 622,
    name: "Huyện Tam Nông",
    provinceId: 56
  },
  {
    id: 625,
    name: "Huyện Thanh Bình",
    provinceId: 56
  },
  {
    id: 628,
    name: "Huyện Châu Thành",
    provinceId: 56
  },
  {
    id: 627,
    name: "Huyện Lai Vung",
    provinceId: 56
  },
  {
    id: 609,
    name: "Thành phố Vĩnh Long",
    provinceId: 55
  },
  {
    id: 614,
    name: "Thị xã Bình Minh",
    provinceId: 55
  },
  {
    id: 613,
    name: "Huyện Tam Bình",
    provinceId: 55
  },
  {
    id: 612,
    name: "Huyện Vũng Liêm",
    provinceId: 55
  },
  {
    id: 615,
    name: "Huyện Trà Ôn",
    provinceId: 55
  },
  {
    id: 611,
    name: "Huyện Mang Thít",
    provinceId: 55
  },
  {
    id: 610,
    name: "Huyện Long Hồ",
    provinceId: 55
  },
  {
    id: 616,
    name: "Huyện Bình Tân",
    provinceId: 55
  },
  {
    id: 601,
    name: "Thành phố Trà Vinh",
    provinceId: 54
  },
  {
    id: 608,
    name: "Thị xã Duyên Hải",
    provinceId: 54
  },
  {
    id: 607,
    name: "Huyện Trà Cú",
    provinceId: 54
  },
  {
    id: 605,
    name: "Huyện Châu Thành",
    provinceId: 54
  },
  {
    id: 603,
    name: "Huyện Cầu Kè",
    provinceId: 54
  },
  {
    id: 606,
    name: "Huyện Cầu Ngang",
    provinceId: 54
  },
  {
    id: 604,
    name: "Huyện Tiểu Cần",
    provinceId: 54
  },
  {
    id: 602,
    name: "Huyện Càng Long",
    provinceId: 54
  },
  {
    id: 592,
    name: "Thành phố Bến Tre",
    provinceId: 53
  },
  {
    id: 599,
    name: "Huyện Thạnh Phú",
    provinceId: 53
  },
  {
    id: 595,
    name: "Huyện Mỏ Cày Nam",
    provinceId: 53
  },
  {
    id: 600,
    name: "Huyện Mỏ Cày Bắc",
    provinceId: 53
  },
  {
    id: 596,
    name: "Huyện Giồng Trôm",
    provinceId: 53
  },
  {
    id: 594,
    name: "Huyện Chợ Lách",
    provinceId: 53
  },
  {
    id: 593,
    name: "Huyện Châu Thành",
    provinceId: 53
  },
  {
    id: 597,
    name: "Huyện Bình Đại",
    provinceId: 53
  },
  {
    id: 598,
    name: "Huyện Ba Tri",
    provinceId: 53
  },
  {
    id: 582,
    name: "Thành phố Mỹ Tho",
    provinceId: 52
  },
  {
    id: 586,
    name: "Thị xã Cai Lậy",
    provinceId: 52
  },
  {
    id: 583,
    name: "Thị xã Gò Công",
    provinceId: 52
  },
  {
    id: 585,
    name: "Huyện Cái Bè",
    provinceId: 52
  },
  {
    id: 587,
    name: "Huyện Châu Thành",
    provinceId: 52
  },
  {
    id: 588,
    name: "Huyện Chợ Gạo",
    provinceId: 52
  },
  {
    id: 590,
    name: "Huyện Gò Công Đông",
    provinceId: 52
  },
  {
    id: 589,
    name: "Huyện Gò Công Tây",
    provinceId: 52
  },
  {
    id: 591,
    name: "Huyện Tân Phú Đông",
    provinceId: 52
  },
  {
    id: 584,
    name: "Huyện Tân Phước",
    provinceId: 52
  },
  {
    id: 568,
    name: "Thành phố Tân An",
    provinceId: 51
  },
  {
    id: 100007,
    name: "Thị xã Kiến Tường",
    provinceId: 51
  },
  {
    id: 578,
    name: "Huyện Tân Trụ",
    provinceId: 51
  },
  {
    id: 572,
    name: "Huyện Tân Thạnh",
    provinceId: 51
  },
  {
    id: 573,
    name: "Huyện Thạnh Hóa",
    provinceId: 51
  },
  {
    id: 577,
    name: "Huyện Thủ Thừa",
    provinceId: 51
  },
  {
    id: 569,
    name: "Huyện Tân Hưng",
    provinceId: 51
  },
  {
    id: 571,
    name: "Huyện Mộc Hóa",
    provinceId: 51
  },
  {
    id: 574,
    name: "Huyện Đức Huệ",
    provinceId: 51
  },
  {
    id: 575,
    name: "Huyện Đức Hòa",
    provinceId: 51
  },
  {
    id: 581,
    name: "Huyện Châu Thành",
    provinceId: 51
  },
  {
    id: 580,
    name: "Huyện Cần Giuộc",
    provinceId: 51
  },
  {
    id: 579,
    name: "Huyện Cần Đước",
    provinceId: 51
  },
  {
    id: 576,
    name: "Huyện Bến Lức",
    provinceId: 51
  },
  {
    id: 570,
    name: "Huyện Vĩnh Hưng",
    provinceId: 51
  },
  {
    id: 536,
    name: "Thành phố Vũng Tàu",
    provinceId: 49
  },
  {
    id: 537,
    name: "Thành phố Bà Rịa",
    provinceId: 49
  },
  {
    id: 542,
    name: "Thị xã Phú Mỹ",
    provinceId: 49
  },
  {
    id: 538,
    name: "Huyện Châu Đức",
    provinceId: 49
  },
  {
    id: 543,
    name: "Côn Đảo",
    provinceId: 49
  },
  {
    id: 540,
    name: "Huyện Long Điền",
    provinceId: 49
  },
  {
    id: 541,
    name: "Huyện Đất Đỏ",
    provinceId: 49
  },
  {
    id: 539,
    name: "Huyện Xuyên Mộc",
    provinceId: 49
  },
  {
    id: 509,
    name: "Thành phố Tây Ninh",
    provinceId: 46
  },
  {
    id: 517,
    name: "Thị xã Trảng Bàng",
    provinceId: 46
  },
  {
    id: 514,
    name: "Thị xã Hòa Thành",
    provinceId: 46
  },
  {
    id: 510,
    name: "Huyện Tân Biên",
    provinceId: 46
  },
  {
    id: 515,
    name: "Huyện Gò Dầu",
    provinceId: 46
  },
  {
    id: 512,
    name: "Huyện Dương Minh Châu",
    provinceId: 46
  },
  {
    id: 516,
    name: "Huyện Bến Cầu",
    provinceId: 46
  },
  {
    id: 513,
    name: "Huyện Châu Thành",
    provinceId: 46
  },
  {
    id: 511,
    name: "Huyện Tân Châu",
    provinceId: 46
  },
  {
    id: 500,
    name: "Thành phố Đồng Xoài",
    provinceId: 45
  },
  {
    id: 499,
    name: "Thị xã Phước Long",
    provinceId: 45
  },
  {
    id: 501,
    name: "Thị xã Bình Long",
    provinceId: 45
  },
  {
    id: 507,
    name: "Huyện Bù Đăng",
    provinceId: 45
  },
  {
    id: 504,
    name: "Huyện Bù Đốp",
    provinceId: 45
  },
  {
    id: 502,
    name: "Huyện Bù Gia Mập",
    provinceId: 45
  },
  {
    id: 508,
    name: "Huyện Chơn Thành",
    provinceId: 45
  },
  {
    id: 506,
    name: "Huyện Đồng Phú",
    provinceId: 45
  },
  {
    id: 505,
    name: "Huyện Hớn Quản",
    provinceId: 45
  },
  {
    id: 503,
    name: "Huyện Lộc Ninh",
    provinceId: 45
  },
  {
    id: 487,
    name: "Thành phố Đà Lạt",
    provinceId: 44
  },
  {
    id: 488,
    name: "Thành phố Bảo Lộc",
    provinceId: 44
  },
  {
    id: 498,
    name: "Huyện Cát Tiên",
    provinceId: 44
  },
  {
    id: 494,
    name: "Huyện Di Linh",
    provinceId: 44
  },
  {
    id: 497,
    name: "Huyện Đạ Tẻh",
    provinceId: 44
  },
  {
    id: 489,
    name: "Huyện Đam Rông",
    provinceId: 44
  },
  {
    id: 493,
    name: "Huyện Đức Trọng",
    provinceId: 44
  },
  {
    id: 490,
    name: "Huyện Lạc Dương",
    provinceId: 44
  },
  {
    id: 491,
    name: "Huyện Lâm Hà",
    provinceId: 44
  },
  {
    id: 496,
    name: "Huyện Đạ Huoai",
    provinceId: 44
  },
  {
    id: 492,
    name: "Huyện Đơn Dương",
    provinceId: 44
  },
  {
    id: 495,
    name: "Huyện Bảo Lâm",
    provinceId: 44
  },
  {
    id: 479,
    name: "Thành phố Gia Nghĩa",
    provinceId: 43
  },
  {
    id: 482,
    name: "Huyện Đắk Mil",
    provinceId: 43
  },
  {
    id: 481,
    name: "Huyện Cư Jút",
    provinceId: 43
  },
  {
    id: 480,
    name: "Huyện Đăk Glong",
    provinceId: 43
  },
  {
    id: 485,
    name: "Huyện Đắk RLấp",
    provinceId: 43
  },
  {
    id: 484,
    name: "Huyện Đắk Song",
    provinceId: 43
  },
  {
    id: 483,
    name: "Huyện Krông Nô",
    provinceId: 43
  },
  {
    id: 486,
    name: "Huyện Tuy Đức",
    provinceId: 43
  },
  {
    id: 464,
    name: "Thành phố Buôn Ma Thuột",
    provinceId: 42
  },
  {
    id: 465,
    name: "Thị Xã Buôn Hồ",
    provinceId: 42
  },
  {
    id: 473,
    name: "Huyện MĐrắk",
    provinceId: 42
  },
  {
    id: 477,
    name: "Huyện Lắk",
    provinceId: 42
  },
  {
    id: 475,
    name: "Huyện Krông Pắc",
    provinceId: 42
  },
  {
    id: 471,
    name: "Huyện Krông Năng",
    provinceId: 42
  },
  {
    id: 469,
    name: "Huyện Cư Mgar",
    provinceId: 42
  },
  {
    id: 476,
    name: "Huyện Krông A Na",
    provinceId: 42
  },
  {
    id: 470,
    name: "Huyện Krông Búk",
    provinceId: 42
  },
  {
    id: 478,
    name: "Huyện Cư Kuin",
    provinceId: 42
  },
  {
    id: 467,
    name: "Huyện Ea Súp",
    provinceId: 42
  },
  {
    id: 466,
    name: "Huyện Ea Hleo",
    provinceId: 42
  },
  {
    id: 474,
    name: "Huyện Krông Bông",
    provinceId: 42
  },
  {
    id: 468,
    name: "Huyện Buôn Đôn",
    provinceId: 42
  },
  {
    id: 472,
    name: "Huyện Ea Kar",
    provinceId: 42
  },
  {
    id: 447,
    name: "Thành phố Pleiku",
    provinceId: 41
  },
  {
    id: 448,
    name: "Thị xã An Khê",
    provinceId: 41
  },
  {
    id: 449,
    name: "Thị xã Ayun Pa",
    provinceId: 41
  },
  {
    id: 453,
    name: "Huyện Ia Grai",
    provinceId: 41
  },
  {
    id: 456,
    name: "Huyện Đức Cơ",
    provinceId: 41
  },
  {
    id: 459,
    name: "Huyện Đăk Pơ",
    provinceId: 41
  },
  {
    id: 451,
    name: "Huyện Đăk Đoa",
    provinceId: 41
  },
  {
    id: 458,
    name: "Huyện Chư Sê",
    provinceId: 41
  },
  {
    id: 463,
    name: "Huyện Chư Pưh",
    provinceId: 41
  },
  {
    id: 457,
    name: "Huyện Chư Prông",
    provinceId: 41
  },
  {
    id: 452,
    name: "Huyện Chư Păh",
    provinceId: 41
  },
  {
    id: 461,
    name: "Huyện Krông Pa",
    provinceId: 41
  },
  {
    id: 455,
    name: "Huyện Kông Chro",
    provinceId: 41
  },
  {
    id: 462,
    name: "Huyện Phú Thiện",
    provinceId: 41
  },
  {
    id: 454,
    name: "Huyện Mang Yang",
    provinceId: 41
  },
  {
    id: 460,
    name: "Huyện Ia Pa",
    provinceId: 41
  },
  {
    id: 450,
    name: "Huyện KBang",
    provinceId: 41
  },
  {
    id: 438,
    name: "Thành phố Kon Tum",
    provinceId: 40
  },
  {
    id: 444,
    name: "Huyện Đắk Hà",
    provinceId: 40
  },
  {
    id: 441,
    name: "Huyện Đắk Tô",
    provinceId: 40
  },
  {
    id: 446,
    name: "Huyện Tu Mơ Rông",
    provinceId: 40
  },
  {
    id: 442,
    name: "Huyện Kon Plông",
    provinceId: 40
  },
  {
    id: 443,
    name: "Huyện Kon Rẫy",
    provinceId: 40
  },
  {
    id: 440,
    name: "Huyện Ngọc Hồi",
    provinceId: 40
  },
  {
    id: 445,
    name: "Huyện Sa Thầy",
    provinceId: 40
  },
  {
    id: 439,
    name: "Huyện Đắk Glei",
    provinceId: 40
  },
  {
    id: 428,
    name: "Thành phố Phan Thiết",
    provinceId: 39
  },
  {
    id: 429,
    name: "Thị xã La Gi",
    provinceId: 39
  },
  {
    id: 436,
    name: "Huyện Hàm Tân",
    provinceId: 39
  },
  {
    id: 431,
    name: "Huyện Bắc Bình",
    provinceId: 39
  },
  {
    id: 435,
    name: "Huyện Đức Linh",
    provinceId: 39
  },
  {
    id: 432,
    name: "Huyện Hàm Thuận Bắc",
    provinceId: 39
  },
  {
    id: 433,
    name: "Huyện Hàm Thuận Nam",
    provinceId: 39
  },
  {
    id: 437,
    name: "Huyện Phú Quí",
    provinceId: 39
  },
  {
    id: 434,
    name: "Huyện Tánh Linh",
    provinceId: 39
  },
  {
    id: 430,
    name: "Huyện Tuy Phong",
    provinceId: 39
  },
  {
    id: 421,
    name: "Thành phố Phan Rang Tháp Chàm",
    provinceId: 38
  },
  {
    id: 425,
    name: "Huyện Ninh Phước",
    provinceId: 38
  },
  {
    id: 424,
    name: "Huyện Ninh Hải",
    provinceId: 38
  },
  {
    id: 422,
    name: "Huyện Bác Ái",
    provinceId: 38
  },
  {
    id: 426,
    name: "Huyện Thuận Bắc",
    provinceId: 38
  },
  {
    id: 423,
    name: "Huyện Ninh Sơn",
    provinceId: 38
  },
  {
    id: 427,
    name: "Huyện Thuận Nam",
    provinceId: 38
  },
  {
    id: 413,
    name: "Thành phố Cam Ranh",
    provinceId: 37
  },
  {
    id: 412,
    name: "Thành phố Nha Trang",
    provinceId: 37
  },
  {
    id: 416,
    name: "Thị xã Ninh Hòa",
    provinceId: 37
  },
  {
    id: 420,
    name: "Huyện Trường Sa",
    provinceId: 37
  },
  {
    id: 414,
    name: "Huyện Cam Lâm",
    provinceId: 37
  },
  {
    id: 418,
    name: "Huyện Diên Khánh",
    provinceId: 37
  },
  {
    id: 419,
    name: "Huyện Khánh Sơn",
    provinceId: 37
  },
  {
    id: 417,
    name: "Huyện Khánh Vĩnh",
    provinceId: 37
  },
  {
    id: 415,
    name: "Huyện Vạn Ninh",
    provinceId: 37
  },
  {
    id: 403,
    name: "Thành phố Tuy Hòa",
    provinceId: 36
  },
  {
    id: 411,
    name: "Thị xã Đông Hòa",
    provinceId: 36
  },
  {
    id: 404,
    name: "Thị xã Sông Cầu",
    provinceId: 36
  },
  {
    id: 406,
    name: "Huyện Tuy An",
    provinceId: 36
  },
  {
    id: 410,
    name: "Huyện Phú Hòa",
    provinceId: 36
  },
  {
    id: 408,
    name: "Huyện Sông Hinh",
    provinceId: 36
  },
  {
    id: 407,
    name: "Huyện Sơn Hòa",
    provinceId: 36
  },
  {
    id: 409,
    name: "Huyện Tây Hòa",
    provinceId: 36
  },
  {
    id: 405,
    name: "Huyện Đồng Xuân",
    provinceId: 36
  },
  {
    id: 392,
    name: "Thành phố Qui Nhơn",
    provinceId: 35
  },
  {
    id: 400,
    name: "Thị xã An Nhơn",
    provinceId: 35
  },
  {
    id: 394,
    name: "Thị xã Hoài Nhơn",
    provinceId: 35
  },
  {
    id: 398,
    name: "Huyện Tây Sơn",
    provinceId: 35
  },
  {
    id: 393,
    name: "Huyện An Lão",
    provinceId: 35
  },
  {
    id: 395,
    name: "Huyện Hoài Ân",
    provinceId: 35
  },
  {
    id: 399,
    name: "Huyện Phù Cát",
    provinceId: 35
  },
  {
    id: 396,
    name: "Huyện Phù Mỹ",
    provinceId: 35
  },
  {
    id: 401,
    name: "Huyện Tuy Phước",
    provinceId: 35
  },
  {
    id: 402,
    name: "Huyện Vân Canh",
    provinceId: 35
  },
  {
    id: 397,
    name: "Huyện Vĩnh Thạnh",
    provinceId: 35
  },
  {
    id: 378,
    name: "Thành phố Quảng Ngãi",
    provinceId: 34
  },
  {
    id: 389,
    name: "Thị xã Đức Phổ",
    provinceId: 34
  },
  {
    id: 379,
    name: "Huyện Bình Sơn",
    provinceId: 34
  },
  {
    id: 391,
    name: "Huyện Lý Sơn",
    provinceId: 34
  },
  {
    id: 388,
    name: "Huyện Mộ Đức",
    provinceId: 34
  },
  {
    id: 387,
    name: "Huyện Nghĩa Hành",
    provinceId: 34
  },
  {
    id: 384,
    name: "Huyện Sơn Hà",
    provinceId: 34
  },
  {
    id: 385,
    name: "Huyện Sơn Tây",
    provinceId: 34
  },
  {
    id: 382,
    name: "Huyện Sơn Tịnh",
    provinceId: 34
  },
  {
    id: 383,
    name: "Huyện Tư Nghĩa",
    provinceId: 34
  },
  {
    id: 380,
    name: "Huyện Trà Bồng",
    provinceId: 34
  },
  {
    id: 381,
    name: "Tây Trà",
    provinceId: 34
  },
  {
    id: 390,
    name: "Huyện Ba Tơ",
    provinceId: 34
  },
  {
    id: 386,
    name: "Huyện Minh Long",
    provinceId: 34
  },
  {
    id: 360,
    name: "Thành phố Tam Kỳ",
    provinceId: 33
  },
  {
    id: 361,
    name: "Thành phố Hội An",
    provinceId: 33
  },
  {
    id: 365,
    name: "Thị xã Điện Bàn",
    provinceId: 33
  },
  {
    id: 377,
    name: "Huyện Nông Sơn",
    provinceId: 33
  },
  {
    id: 367,
    name: "Huyện Quế Sơn",
    provinceId: 33
  },
  {
    id: 362,
    name: "Huyện Tây Giang",
    provinceId: 33
  },
  {
    id: 372,
    name: "Huyện Tiên Phước",
    provinceId: 33
  },
  {
    id: 366,
    name: "Huyện Duy Xuyên",
    provinceId: 33
  },
  {
    id: 373,
    name: "Huyện Bắc Trà My",
    provinceId: 33
  },
  {
    id: 364,
    name: "Huyện Đại Lộc",
    provinceId: 33
  },
  {
    id: 363,
    name: "Huyện Đông Giang",
    provinceId: 33
  },
  {
    id: 370,
    name: "Huyện Hiệp Đức",
    provinceId: 33
  },
  {
    id: 368,
    name: "Huyện Nam Giang",
    provinceId: 33
  },
  {
    id: 374,
    name: "Huyện Nam Trà My",
    provinceId: 33
  },
  {
    id: 369,
    name: "Huyện Phước Sơn",
    provinceId: 33
  },
  {
    id: 375,
    name: "Huyện Núi Thành",
    provinceId: 33
  },
  {
    id: 376,
    name: "Huyện Phú Ninh",
    provinceId: 33
  },
  {
    id: 371,
    name: "Huyện Thăng Bình",
    provinceId: 33
  },
  {
    id: 353,
    name: "Quận Thanh Khê",
    provinceId: 32
  },
  {
    id: 352,
    name: "Quận Liên Chiểu",
    provinceId: 32
  },
  {
    id: 354,
    name: "Quận Hải Châu",
    provinceId: 32
  },
  {
    id: 357,
    name: "Quận Cẩm Lệ",
    provinceId: 32
  },
  {
    id: 356,
    name: "Quận Ngũ Hành Sơn",
    provinceId: 32
  },
  {
    id: 355,
    name: "Quận Sơn Trà",
    provinceId: 32
  },
  {
    id: 358,
    name: "Huyện Hòa Vang",
    provinceId: 32
  },
  {
    id: 359,
    name: "Hoàng Sa",
    provinceId: 32
  },
  {
    id: 343,
    name: "Thành phố Huế",
    provinceId: 31
  },
  {
    id: 348,
    name: "Thị xã Hương Trà",
    provinceId: 31
  },
  {
    id: 347,
    name: "Thị xã Hương Thủy",
    provinceId: 31
  },
  {
    id: 345,
    name: "Huyện Quảng Điền",
    provinceId: 31
  },
  {
    id: 346,
    name: "Huyện Phú Vang",
    provinceId: 31
  },
  {
    id: 350,
    name: "Huyện Phú Lộc",
    provinceId: 31
  },
  {
    id: 344,
    name: "Huyện Phong Điền",
    provinceId: 31
  },
  {
    id: 351,
    name: "Huyện Nam Đông",
    provinceId: 31
  },
  {
    id: 349,
    name: "Huyện A Lưới",
    provinceId: 31
  },
  {
    id: 333,
    name: "Thành phố Đông Hà",
    provinceId: 30
  },
  {
    id: 334,
    name: "Thị xã Quảng Trị",
    provinceId: 30
  },
  {
    id: 336,
    name: "Huyện Hướng Hóa",
    provinceId: 30
  },
  {
    id: 337,
    name: "Huyện Gio Linh",
    provinceId: 30
  },
  {
    id: 340,
    name: "Huyện Triệu Phong",
    provinceId: 30
  },
  {
    id: 342,
    name: "Cồn Cỏ",
    provinceId: 30
  },
  {
    id: 338,
    name: "Huyện Đa Krông",
    provinceId: 30
  },
  {
    id: 339,
    name: "Huyện Cam Lộ",
    provinceId: 30
  },
  {
    id: 341,
    name: "Huyện Hải Lăng",
    provinceId: 30
  },
  {
    id: 335,
    name: "Huyện Vĩnh Linh",
    provinceId: 30
  },
  {
    id: 326,
    name: "Thành Phố Đồng Hới",
    provinceId: 29
  },
  {
    id: 100001,
    name: "Thị xã Ba Đồn",
    provinceId: 29
  },
  {
    id: 327,
    name: "Huyện Minh Hóa",
    provinceId: 29
  },
  {
    id: 331,
    name: "Huyện Quảng Ninh",
    provinceId: 29
  },
  {
    id: 329,
    name: "Huyện Quảng Trạch",
    provinceId: 29
  },
  {
    id: 328,
    name: "Huyện Tuyên Hóa",
    provinceId: 29
  },
  {
    id: 330,
    name: "Huyện Bố Trạch",
    provinceId: 29
  },
  {
    id: 332,
    name: "Huyện Lệ Thủy",
    provinceId: 29
  },
  {
    id: 314,
    name: "Thành phố Hà Tĩnh",
    provinceId: 28
  },
  {
    id: 315,
    name: "Thị xã Hồng Lĩnh",
    provinceId: 28
  },
  {
    id: 324,
    name: "Thị xã Kỳ Anh",
    provinceId: 28
  },
  {
    id: 320,
    name: "Huyện Can Lộc",
    provinceId: 28
  },
  {
    id: 317,
    name: "Huyện Đức Thọ",
    provinceId: 28
  },
  {
    id: 316,
    name: "Huyện Hương Sơn",
    provinceId: 28
  },
  {
    id: 325,
    name: "Huyện Lộc Hà",
    provinceId: 28
  },
  {
    id: 319,
    name: "Huyện Nghi Xuân",
    provinceId: 28
  },
  {
    id: 321,
    name: "Huyện Hương Khê",
    provinceId: 28
  },
  {
    id: 322,
    name: "Huyện Thạch Hà",
    provinceId: 28
  },
  {
    id: 318,
    name: "Huyện Vũ Quang",
    provinceId: 28
  },
  {
    id: 323,
    name: "Huyện Cẩm Xuyên",
    provinceId: 28
  },
  {
    id: 294,
    name: "Thành phố Vinh",
    provinceId: 27
  },
  {
    id: 100008,
    name: "Thị xã Hoàng Mai",
    provinceId: 27
  },
  {
    id: 295,
    name: "Thị xã Cửa Lò",
    provinceId: 27
  },
  {
    id: 296,
    name: "Thị xã Thái Hòa",
    provinceId: 27
  },
  {
    id: 304,
    name: "Huyện Con Cuông",
    provinceId: 27
  },
  {
    id: 297,
    name: "Huyện Quế Phong",
    provinceId: 27
  },
  {
    id: 298,
    name: "Huyện Quỳ Châu",
    provinceId: 27
  },
  {
    id: 302,
    name: "Huyện Quỳ Hợp",
    provinceId: 27
  },
  {
    id: 303,
    name: "Huyện Quỳnh Lưu",
    provinceId: 27
  },
  {
    id: 305,
    name: "Huyện Tân Kỳ",
    provinceId: 27
  },
  {
    id: 300,
    name: "Huyện Tương Dương",
    provinceId: 27
  },
  {
    id: 310,
    name: "Huyện Thanh Chương",
    provinceId: 27
  },
  {
    id: 308,
    name: "Huyện Yên Thành",
    provinceId: 27
  },
  {
    id: 299,
    name: "Huyện Kỳ Sơn",
    provinceId: 27
  },
  {
    id: 313,
    name: "Huyện Hưng Nguyên",
    provinceId: 27
  },
  {
    id: 309,
    name: "Huyện Đô Lương",
    provinceId: 27
  },
  {
    id: 307,
    name: "Huyện Diễn Châu",
    provinceId: 27
  },
  {
    id: 301,
    name: "Huyện Nghĩa Đàn",
    provinceId: 27
  },
  {
    id: 306,
    name: "Huyện Anh Sơn",
    provinceId: 27
  },
  {
    id: 312,
    name: "Huyện Nam Đàn",
    provinceId: 27
  },
  {
    id: 311,
    name: "Huyện Nghi Lộc",
    provinceId: 27
  },
  {
    id: 269,
    name: "Thành phố Sầm Sơn",
    provinceId: 26
  },
  {
    id: 267,
    name: "Thành phố Thanh Hóa",
    provinceId: 26
  },
  {
    id: 268,
    name: "Thị xã Bỉm Sơn",
    provinceId: 26
  },
  {
    id: 293,
    name: "Thị xã Nghi Sơn",
    provinceId: 26
  },
  {
    id: 284,
    name: "Huyện Thiệu Hóa",
    provinceId: 26
  },
  {
    id: 276,
    name: "Huyện Cẩm Thủy",
    provinceId: 26
  },
  {
    id: 291,
    name: "Huyện Đông Sơn",
    provinceId: 26
  },
  {
    id: 278,
    name: "Huyện Hà Trung",
    provinceId: 26
  },
  {
    id: 286,
    name: "Huyện Hậu Lộc",
    provinceId: 26
  },
  {
    id: 285,
    name: "Huyện Hoằng Hóa",
    provinceId: 26
  },
  {
    id: 274,
    name: "Huyện Lang Chánh",
    provinceId: 26
  },
  {
    id: 270,
    name: "Huyện Mường Lát",
    provinceId: 26
  },
  {
    id: 290,
    name: "Huyện Nông Cống",
    provinceId: 26
  },
  {
    id: 287,
    name: "Huyện Nga Sơn",
    provinceId: 26
  },
  {
    id: 275,
    name: "Huyện Ngọc Lặc",
    provinceId: 26
  },
  {
    id: 289,
    name: "Huyện Như Thanh",
    provinceId: 26
  },
  {
    id: 288,
    name: "Huyện Như Xuân",
    provinceId: 26
  },
  {
    id: 271,
    name: "Huyện Quan Hóa",
    provinceId: 26
  },
  {
    id: 273,
    name: "Huyện Quan Sơn",
    provinceId: 26
  },
  {
    id: 292,
    name: "Huyện Quảng Xương",
    provinceId: 26
  },
  {
    id: 277,
    name: "Huyện Thạch Thành",
    provinceId: 26
  },
  {
    id: 281,
    name: "Huyện Thọ Xuân",
    provinceId: 26
  },
  {
    id: 282,
    name: "Huyện Thường Xuân",
    provinceId: 26
  },
  {
    id: 283,
    name: "Huyện Triệu Sơn",
    provinceId: 26
  },
  {
    id: 279,
    name: "Huyện Vĩnh Lộc",
    provinceId: 26
  },
  {
    id: 280,
    name: "Huyện Yên Định",
    provinceId: 26
  },
  {
    id: 272,
    name: "Huyện Bá Thước",
    provinceId: 26
  },
  {
    id: 260,
    name: "Thành phố Tam Điệp",
    provinceId: 25
  },
  {
    id: 259,
    name: "Thành phố Ninh Bình",
    provinceId: 25
  },
  {
    id: 266,
    name: "Huyện Yên Mô",
    provinceId: 25
  },
  {
    id: 264,
    name: "Huyện Yên Khánh",
    provinceId: 25
  },
  {
    id: 261,
    name: "Huyện Nho Quan",
    provinceId: 25
  },
  {
    id: 265,
    name: "Huyện Kim Sơn",
    provinceId: 25
  },
  {
    id: 263,
    name: "Huyện Hoa Lư",
    provinceId: 25
  },
  {
    id: 262,
    name: "Huyện Gia Viễn",
    provinceId: 25
  },
  {
    id: 249,
    name: "Thành phố Nam Định",
    provinceId: 24
  },
  {
    id: 257,
    name: "Huyện Giao Thủy",
    provinceId: 24
  },
  {
    id: 252,
    name: "Huyện Ý Yên",
    provinceId: 24
  },
  {
    id: 256,
    name: "Huyện Xuân Trường",
    provinceId: 24
  },
  {
    id: 251,
    name: "Huyện Vụ Bản",
    provinceId: 24
  },
  {
    id: 255,
    name: "Huyện Trực Ninh",
    provinceId: 24
  },
  {
    id: 250,
    name: "Huyện Mỹ Lộc",
    provinceId: 24
  },
  {
    id: 258,
    name: "Huyện Hải Hậu",
    provinceId: 24
  },
  {
    id: 253,
    name: "Huyện Nghĩa Hưng",
    provinceId: 24
  },
  {
    id: 254,
    name: "Huyện Nam Trực",
    provinceId: 24
  },
  {
    id: 243,
    name: "Thành phố Phủ Lý",
    provinceId: 23
  },
  {
    id: 244,
    name: "Thị xã Duy Tiên",
    provinceId: 23
  },
  {
    id: 245,
    name: "Huyện Kim Bảng",
    provinceId: 23
  },
  {
    id: 247,
    name: "Huyện Bình Lục",
    provinceId: 23
  },
  {
    id: 246,
    name: "Huyện Thanh Liêm",
    provinceId: 23
  },
  {
    id: 248,
    name: "Huyện Lý Nhân",
    provinceId: 23
  },
  {
    id: 235,
    name: "Thành phố Thái Bình",
    provinceId: 22
  },
  {
    id: 240,
    name: "Huyện Tiền Hải",
    provinceId: 22
  },
  {
    id: 236,
    name: "Huyện Quỳnh Phụ",
    provinceId: 22
  },
  {
    id: 237,
    name: "Huyện Hưng Hà",
    provinceId: 22
  },
  {
    id: 238,
    name: "Huyện Đông Hưng",
    provinceId: 22
  },
  {
    id: 242,
    name: "Huyện Vũ Thư",
    provinceId: 22
  },
  {
    id: 241,
    name: "Huyện Kiến Xương",
    provinceId: 22
  },
  {
    id: 239,
    name: "Huyện Thái Thụy",
    provinceId: 22
  },
  {
    id: 225,
    name: "Thành phố Hưng Yên",
    provinceId: 21
  },
  {
    id: 229,
    name: "Thị xã Mỹ Hào",
    provinceId: 21
  },
  {
    id: 230,
    name: "Huyện Ân Thi",
    provinceId: 21
  },
  {
    id: 234,
    name: "Huyện Phù Cừ",
    provinceId: 21
  },
  {
    id: 233,
    name: "Huyện Tiên Lữ",
    provinceId: 21
  },
  {
    id: 232,
    name: "Huyện Kim Động",
    provinceId: 21
  },
  {
    id: 227,
    name: "Huyện Văn Giang",
    provinceId: 21
  },
  {
    id: 226,
    name: "Huyện Văn Lâm",
    provinceId: 21
  },
  {
    id: 228,
    name: "Huyện Yên Mỹ",
    provinceId: 21
  },
  {
    id: 231,
    name: "Huyện Khoái Châu",
    provinceId: 21
  },
  {
    id: 213,
    name: "Quận Hải An",
    provinceId: 20
  },
  {
    id: 211,
    name: "Quận Ngô Quyền",
    provinceId: 20
  },
  {
    id: 212,
    name: "Quận Lê Chân",
    provinceId: 20
  },
  {
    id: 210,
    name: "Quận Hồng Bàng",
    provinceId: 20
  },
  {
    id: 215,
    name: "Quận Đồ Sơn",
    provinceId: 20
  },
  {
    id: 216,
    name: "Quận Dương Kinh",
    provinceId: 20
  },
  {
    id: 214,
    name: "Quận Kiến An",
    provinceId: 20
  },
  {
    id: 220,
    name: "Huyện Kiến Thụy",
    provinceId: 20
  },
  {
    id: 223,
    name: "Huyện Cát Hải",
    provinceId: 20
  },
  {
    id: 221,
    name: "Huyện Tiên Lãng",
    provinceId: 20
  },
  {
    id: 219,
    name: "Huyện An Lão",
    provinceId: 20
  },
  {
    id: 218,
    name: "Huyện An Dương",
    provinceId: 20
  },
  {
    id: 224,
    name: "Bạch Long Vĩ",
    provinceId: 20
  },
  {
    id: 222,
    name: "Huyện Vĩnh Bảo",
    provinceId: 20
  },
  {
    id: 217,
    name: "Huyện Thủy Nguyên",
    provinceId: 20
  },
  {
    id: 199,
    name: "Thành phố Chí Linh",
    provinceId: 19
  },
  {
    id: 198,
    name: "Thành phố Hải Dương",
    provinceId: 19
  },
  {
    id: 201,
    name: "Thị xã Kinh Môn",
    provinceId: 19
  },
  {
    id: 205,
    name: "Huyện Bình Giang",
    provinceId: 19
  },
  {
    id: 206,
    name: "Huyện Gia Lộc",
    provinceId: 19
  },
  {
    id: 204,
    name: "Huyện Cẩm Giàng",
    provinceId: 19
  },
  {
    id: 209,
    name: "Huyện Thanh Miện",
    provinceId: 19
  },
  {
    id: 203,
    name: "Huyện Thanh Hà",
    provinceId: 19
  },
  {
    id: 207,
    name: "Huyện Tứ Kỳ",
    provinceId: 19
  },
  {
    id: 208,
    name: "Huyện Ninh Giang",
    provinceId: 19
  },
  {
    id: 200,
    name: "Huyện Nam Sách",
    provinceId: 19
  },
  {
    id: 202,
    name: "Huyện Kim Thành",
    provinceId: 19
  },
  {
    id: 176,
    name: "Thành phố Bắc Ninh",
    provinceId: 18
  },
  {
    id: 180,
    name: "Thị xã Từ Sơn",
    provinceId: 18
  },
  {
    id: 183,
    name: "Huyện Lương Tài",
    provinceId: 18
  },
  {
    id: 177,
    name: "Huyện Yên Phong",
    provinceId: 18
  },
  {
    id: 179,
    name: "Huyện Tiên Du",
    provinceId: 18
  },
  {
    id: 178,
    name: "Huyện Quế Võ",
    provinceId: 18
  },
  {
    id: 181,
    name: "Huyện Thuận Thành",
    provinceId: 18
  },
  {
    id: 182,
    name: "Huyện Gia Bình",
    provinceId: 18
  },
  {
    id: 166,
    name: "Thành phố Vĩnh Yên",
    provinceId: 17
  },
  {
    id: 167,
    name: "Thành phố Phúc Yên",
    provinceId: 17
  },
  {
    id: 173,
    name: "Huyện Yên Lạc",
    provinceId: 17
  },
  {
    id: 168,
    name: "Huyện Lập Thạch",
    provinceId: 17
  },
  {
    id: 171,
    name: "Huyện Bình Xuyên",
    provinceId: 17
  },
  {
    id: 174,
    name: "Huyện Vĩnh Tường",
    provinceId: 17
  },
  {
    id: 175,
    name: "Huyện Sông Lô",
    provinceId: 17
  },
  {
    id: 170,
    name: "Huyện Tam Đảo",
    provinceId: 17
  },
  {
    id: 169,
    name: "Huyện Tam Dương",
    provinceId: 17
  },
  {
    id: 153,
    name: "Thành phố Việt Trì",
    provinceId: 16
  },
  {
    id: 154,
    name: "Thị xã Phú Thọ",
    provinceId: 16
  },
  {
    id: 158,
    name: "Huyện Phù Ninh",
    provinceId: 16
  },
  {
    id: 161,
    name: "Huyện Tam Nông",
    provinceId: 16
  },
  {
    id: 165,
    name: "Huyện Tân Sơn",
    provinceId: 16
  },
  {
    id: 157,
    name: "Huyện Thanh Ba",
    provinceId: 16
  },
  {
    id: 163,
    name: "Huyện Thanh Sơn",
    provinceId: 16
  },
  {
    id: 164,
    name: "Huyện Thanh Thủy",
    provinceId: 16
  },
  {
    id: 159,
    name: "Huyện Yên Lập",
    provinceId: 16
  },
  {
    id: 156,
    name: "Huyện Hạ Hòa",
    provinceId: 16
  },
  {
    id: 162,
    name: "Huyện Lâm Thao",
    provinceId: 16
  },
  {
    id: 160,
    name: "Huyện Cẩm Khê",
    provinceId: 16
  },
  {
    id: 155,
    name: "Huyện Đoan Hùng",
    provinceId: 16
  },
  {
    id: 143,
    name: "Thành phố Bắc Giang",
    provinceId: 15
  },
  {
    id: 145,
    name: "Huyện Tân Yên",
    provinceId: 15
  },
  {
    id: 149,
    name: "Huyện Sơn Động",
    provinceId: 15
  },
  {
    id: 148,
    name: "Huyện Lục Ngạn",
    provinceId: 15
  },
  {
    id: 147,
    name: "Huyện Lục Nam",
    provinceId: 15
  },
  {
    id: 146,
    name: "Huyện Lạng Giang",
    provinceId: 15
  },
  {
    id: 152,
    name: "Huyện Hiệp Hòa",
    provinceId: 15
  },
  {
    id: 144,
    name: "Huyện Yên Thế",
    provinceId: 15
  },
  {
    id: 151,
    name: "Huyện Việt Yên",
    provinceId: 15
  },
  {
    id: 150,
    name: "Huyện Yên Dũng",
    provinceId: 15
  },
  {
    id: 131,
    name: "Thành phố Cẩm Phả",
    provinceId: 14
  },
  {
    id: 130,
    name: "Thành phố Móng Cái",
    provinceId: 14
  },
  {
    id: 132,
    name: "Thành phố Uông Bí",
    provinceId: 14
  },
  {
    id: 129,
    name: "Thành phố Hạ Long",
    provinceId: 14
  },
  {
    id: 141,
    name: "Thị xã Quảng Yên",
    provinceId: 14
  },
  {
    id: 140,
    name: "Thị xã Đông Triều",
    provinceId: 14
  },
  {
    id: 137,
    name: "Huyện Ba Chẽ",
    provinceId: 14
  },
  {
    id: 133,
    name: "Huyện Bình Liêu",
    provinceId: 14
  },
  {
    id: 142,
    name: "Huyện Cô Tô",
    provinceId: 14
  },
  {
    id: 138,
    name: "Huyện Vân Đồn",
    provinceId: 14
  },
  {
    id: 134,
    name: "Huyện Tiên Yên",
    provinceId: 14
  },
  {
    id: 139,
    name: "Hoành Bồ",
    provinceId: 14
  },
  {
    id: 135,
    name: "Huyện Đầm Hà",
    provinceId: 14
  },
  {
    id: 136,
    name: "Huyện Hải Hà",
    provinceId: 14
  },
  {
    id: 118,
    name: "Thành phố Lạng Sơn",
    provinceId: 13
  },
  {
    id: 121,
    name: "Huyện Văn Lãng",
    provinceId: 13
  },
  {
    id: 128,
    name: "Huyện Đình Lập",
    provinceId: 13
  },
  {
    id: 126,
    name: "Huyện Chi Lăng",
    provinceId: 13
  },
  {
    id: 124,
    name: "Huyện Bắc Sơn",
    provinceId: 13
  },
  {
    id: 119,
    name: "Huyện Tràng Định",
    provinceId: 13
  },
  {
    id: 120,
    name: "Huyện Bình Gia",
    provinceId: 13
  },
  {
    id: 127,
    name: "Huyện Lộc Bình",
    provinceId: 13
  },
  {
    id: 123,
    name: "Huyện Văn Quan",
    provinceId: 13
  },
  {
    id: 125,
    name: "Huyện Hữu Lũng",
    provinceId: 13
  },
  {
    id: 122,
    name: "Huyện Cao Lộc",
    provinceId: 13
  },
  {
    id: 109,
    name: "Thành phố Thái Nguyên",
    provinceId: 12
  },
  {
    id: 110,
    name: "Thành phố Sông Công",
    provinceId: 12
  },
  {
    id: 116,
    name: "Thị xã Phổ Yên",
    provinceId: 12
  },
  {
    id: 114,
    name: "Huyện Võ Nhai",
    provinceId: 12
  },
  {
    id: 111,
    name: "Huyện Định Hóa",
    provinceId: 12
  },
  {
    id: 115,
    name: "Huyện Đại Từ",
    provinceId: 12
  },
  {
    id: 113,
    name: "Huyện Đồng Hỷ",
    provinceId: 12
  },
  {
    id: 117,
    name: "Huyện Phú Bình",
    provinceId: 12
  },
  {
    id: 112,
    name: "Huyện Phú Lương",
    provinceId: 12
  },
  {
    id: 98,
    name: "Thành phố Hòa Bình",
    provinceId: 11
  },
  {
    id: 104,
    name: "Huyện Tân Lạc",
    provinceId: 11
  },
  {
    id: 99,
    name: "Huyện Đà Bắc",
    provinceId: 11
  },
  {
    id: 102,
    name: "Huyện Kim Bôi",
    provinceId: 11
  },
  {
    id: 106,
    name: "Huyện Lạc Sơn",
    provinceId: 11
  },
  {
    id: 108,
    name: "Huyện Lạc Thủy",
    provinceId: 11
  },
  {
    id: 101,
    name: "Huyện Lương Sơn",
    provinceId: 11
  },
  {
    id: 105,
    name: "Huyện Mai Châu",
    provinceId: 11
  },
  {
    id: 107,
    name: "Huyện Yên Thủy",
    provinceId: 11
  },
  {
    id: 100,
    name: "Huyện Duyên Hải",
    provinceId: 11
  },
  {
    id: 103,
    name: "Huyện Cao Phong",
    provinceId: 11
  },
  {
    id: 89,
    name: "Thành phố Yên Bái",
    provinceId: 10
  },
  {
    id: 90,
    name: "Thị xã Nghĩa Lộ",
    provinceId: 10
  },
  {
    id: 91,
    name: "Huyện Lục Yên",
    provinceId: 10
  },
  {
    id: 96,
    name: "Huyện Văn Chấn",
    provinceId: 10
  },
  {
    id: 92,
    name: "Huyện Văn Yên",
    provinceId: 10
  },
  {
    id: 94,
    name: "Huyện Trấn Yên",
    provinceId: 10
  },
  {
    id: 97,
    name: "Huyện Yên Bình",
    provinceId: 10
  },
  {
    id: 93,
    name: "Huyện Mù Căng Chải",
    provinceId: 10
  },
  {
    id: 95,
    name: "Huyện Trạm Tấu",
    provinceId: 10
  },
  {
    id: 78,
    name: "Thành phố Sơn La",
    provinceId: 9
  },
  {
    id: 86,
    name: "Huyện Mai Sơn",
    provinceId: 9
  },
  {
    id: 82,
    name: "Huyện Bắc Yên",
    provinceId: 9
  },
  {
    id: 100009,
    name: "Huyện Vân Hồ",
    provinceId: 9
  },
  {
    id: 84,
    name: "Huyện Mộc Châu",
    provinceId: 9
  },
  {
    id: 81,
    name: "Huyện Mường La",
    provinceId: 9
  },
  {
    id: 83,
    name: "Huyện Phù Yên",
    provinceId: 9
  },
  {
    id: 79,
    name: "Huyện Quỳnh Nhai",
    provinceId: 9
  },
  {
    id: 87,
    name: "Huyện Sông Mã",
    provinceId: 9
  },
  {
    id: 88,
    name: "Huyện Sốp Cộp",
    provinceId: 9
  },
  {
    id: 80,
    name: "Huyện Thuận Châu",
    provinceId: 9
  },
  {
    id: 85,
    name: "Huyện Yên Châu",
    provinceId: 9
  },
  {
    id: 71,
    name: "Thành phố Lai Châu",
    provinceId: 8
  },
  {
    id: 77,
    name: "Huyện Tân Uyên",
    provinceId: 8
  },
  {
    id: 72,
    name: "Huyện Tam Đường",
    provinceId: 8
  },
  {
    id: 73,
    name: "Huyện Mường Tè",
    provinceId: 8
  },
  {
    id: 76,
    name: "Huyện Than Uyên",
    provinceId: 8
  },
  {
    id: 75,
    name: "Huyện Phong Thổ",
    provinceId: 8
  },
  {
    id: 74,
    name: "Huyện Sìn Hồ",
    provinceId: 8
  },
  {
    id: 62,
    name: "Thành phố Điện Biên Phủ",
    provinceId: 7
  },
  {
    id: 63,
    name: "Thị Xã Mường Lay",
    provinceId: 7
  },
  {
    id: 67,
    name: "Huyện Tuần Giáo",
    provinceId: 7
  },
  {
    id: 64,
    name: "Huyện Mường Nhé",
    provinceId: 7
  },
  {
    id: 65,
    name: "Huyện Mường Chà",
    provinceId: 7
  },
  {
    id: 70,
    name: "Huyện Mường Ảng",
    provinceId: 7
  },
  {
    id: 69,
    name: "Huyện Điện Biên Đông",
    provinceId: 7
  },
  {
    id: 100011,
    name: "Huyện Nậm Pồ",
    provinceId: 7
  },
  {
    id: 68,
    name: "Huyện Điện Biên",
    provinceId: 7
  },
  {
    id: 66,
    name: "Huyện Tủa Chùa",
    provinceId: 7
  },
  {
    id: 53,
    name: "Thành phố Lào Cai",
    provinceId: 6
  },
  {
    id: 60,
    name: "Thị xã Sa Pa",
    provinceId: 6
  },
  {
    id: 58,
    name: "Huyện Bảo Thắng",
    provinceId: 6
  },
  {
    id: 59,
    name: "Huyện Bảo Yên",
    provinceId: 6
  },
  {
    id: 54,
    name: "Huyện Bát Xát",
    provinceId: 6
  },
  {
    id: 57,
    name: "Huyện Bắc Hà",
    provinceId: 6
  },
  {
    id: 55,
    name: "Huyện Mường Khương",
    provinceId: 6
  },
  {
    id: 56,
    name: "Huyện Si Ma Cai",
    provinceId: 6
  },
  {
    id: 61,
    name: "Huyện Văn Bàn",
    provinceId: 6
  },
  {
    id: 47,
    name: "Thành phố Tuyên Quang",
    provinceId: 5
  },
  {
    id: 49,
    name: "Huyện Chiêm Hóa",
    provinceId: 5
  },
  {
    id: 48,
    name: "Huyện Na Hang",
    provinceId: 5
  },
  {
    id: 50,
    name: "Huyện Hàm Yên",
    provinceId: 5
  },
  {
    id: 52,
    name: "Huyện Sơn Dương",
    provinceId: 5
  },
  {
    id: 51,
    name: "Huyện Yên Sơn",
    provinceId: 5
  },
  {
    id: 39,
    name: "Thành Phố Bắc Kạn",
    provinceId: 4
  },
  {
    id: 46,
    name: "Huyện Na Rì",
    provinceId: 4
  },
  {
    id: 44,
    name: "Huyện Chợ Đồn",
    provinceId: 4
  },
  {
    id: 40,
    name: "Huyện Pác Nặm",
    provinceId: 4
  },
  {
    id: 45,
    name: "Huyện Chợ Mới",
    provinceId: 4
  },
  {
    id: 43,
    name: "Huyện Bạch Thông",
    provinceId: 4
  },
  {
    id: 41,
    name: "Huyện Ba Bể",
    provinceId: 4
  },
  {
    id: 42,
    name: "Huyện Ngân Sơn",
    provinceId: 4
  },
  {
    id: 26,
    name: "Thành phố Cao Bằng",
    provinceId: 3
  },
  {
    id: 30,
    name: "Huyện Hà Quảng",
    provinceId: 3
  },
  {
    id: 38,
    name: "Huyện Thạch An",
    provinceId: 3
  },
  {
    id: 32,
    name: "Huyện Trùng Khánh",
    provinceId: 3
  },
  {
    id: 34,
    name: "Huyện Kỳ Anh",
    provinceId: 28
  },
  {
    id: 36,
    name: "Huyện Hòa An",
    provinceId: 3
  },
  {
    id: 35,
    name: "Huyện Quảng Hòa",
    provinceId: 3
  },
  {
    id: 31,
    name: "Huyện Long Mỹ",
    provinceId: 60
  },
  {
    id: 29,
    name: "Huyện Cai Lậy",
    provinceId: 52
  },
  {
    id: 28,
    name: "Huyện Bảo Lạc",
    provinceId: 3
  },
  {
    id: 27,
    name: "Huyện Bảo Lâm",
    provinceId: 3
  },
  {
    id: 33,
    name: "Huyện Hạ Lang",
    provinceId: 3
  },
  {
    id: 37,
    name: "Huyện Nguyên Bình",
    provinceId: 3
  },
  {
    id: 15,
    name: "Thành phố Hà Giang",
    provinceId: 2
  },
  {
    id: 25,
    name: "Huyện Quang Bình",
    provinceId: 2
  },
  {
    id: 19,
    name: "Huyện Quản Bạ",
    provinceId: 2
  },
  {
    id: 17,
    name: "Huyện Mèo Vạc",
    provinceId: 2
  },
  {
    id: 22,
    name: "Huyện Hoàng Su Phì",
    provinceId: 2
  },
  {
    id: 16,
    name: "Huyện Đồng Văn",
    provinceId: 2
  },
  {
    id: 24,
    name: "Huyện Bắc Quang",
    provinceId: 2
  },
  {
    id: 21,
    name: "Huyện Bắc Mê",
    provinceId: 2
  },
  {
    id: 18,
    name: "Huyện Yên Minh",
    provinceId: 2
  },
  {
    id: 20,
    name: "Huyện Vị Xuyên",
    provinceId: 2
  },
  {
    id: 23,
    name: "Huyện Xín Mần",
    provinceId: 2
  },
  {
    id: 100006,
    name: "Huyện Nậm Nhùn",
    provinceId: 8
  },
  {
    id: 100010,
    name: "Huyện Lâm Bình",
    provinceId: 5
  },
  {
    id: 100004,
    name: "Huyện Ia H Drai",
    provinceId: 40
  },
  {
    id: 100000,
    name: "Huyện Phú Riềng",
    provinceId: 45
  }
];

export default districts;
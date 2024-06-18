$(function() {
    $(document).on('submit', '.detailForm', function(event) {
        event.preventDefault(); // 폼의 기본 동작(페이지 새로고침)을 막음
        var formData = $(this).serialize();
        $("#HospInfoCard").empty();

        $.ajax({
            url: $(this).attr("action"),
            method: $(this).attr("method"),
            data: formData,
            dataType: "json",
            success: function(response) {
                var LocateList = response.LocateList[0];
                var AvailList = response.AvailList[0];
                console.log(LocateList);
                console.log(AvailList);

                // 데이터(기본정보)
                var dutyname = LocateList.dutyname;
                var dutyaddr = LocateList.dutyaddr;
                var dutytel = AvailList.dutytel;

                // 데이터(운영시간)
                var availtime_mon = LocateList.mons.slice(0, 2) + ":" + LocateList.mons.slice(2, 4) + " ~ " + LocateList.mone.slice(0, 2) + ":" + LocateList.mone.slice(2, 4);
                var availtime_tue = LocateList.tues.slice(0, 2) + ":" + LocateList.tues.slice(2, 4) + " ~ " + LocateList.tuee.slice(0, 2) + ":" + LocateList.tuee.slice(2, 4);
                var availtime_wed = LocateList.weds.slice(0, 2) + ":" + LocateList.weds.slice(2, 4) + " ~ " + LocateList.wede.slice(0, 2) + ":" + LocateList.wede.slice(2, 4);
                var availtime_thu = LocateList.thus.slice(0, 2) + ":" + LocateList.thus.slice(2, 4) + " ~ " + LocateList.thue.slice(0, 2) + ":" + LocateList.thue.slice(2, 4);
                var availtime_fri = LocateList.fris.slice(0, 2) + ":" + LocateList.fris.slice(2, 4) + " ~ " + LocateList.frie.slice(0, 2) + ":" + LocateList.frie.slice(2, 4);
                var availtime_sat = LocateList.sats.slice(0, 2) + ":" + LocateList.sats.slice(2, 4) + " ~ " + LocateList.sate.slice(0, 2) + ":" + LocateList.sate.slice(2, 4);
                var availtime_sun = LocateList.suns.slice(0, 2) + ":" + LocateList.suns.slice(2, 4) + " ~ " + LocateList.sune.slice(0, 2) + ":" + LocateList.sune.slice(2, 4);
                var availtime_holi = LocateList.holis.slice(0, 2) + ":" + LocateList.holis.slice(2, 4) + " ~ " + LocateList.holie.slice(0, 2) + ":" + LocateList.holie.slice(2, 4);

                var avail = [LocateList.mons, LocateList.tues, LocateList.weds, LocateList.thus,
                             LocateList.fris, LocateList.sats, LocateList.suns, LocateList.holis];

                var availtime = [availtime_mon, availtime_tue, availtime_wed, availtime_thu,
                                 availtime_fri, availtime_sat, availtime_sun, availtime_holi];

                for (var i = 0; i < availtime.length; i++) {if (avail[i] == '-') {availtime[i] = '휴무';}}

                // 데이터(가용병상)
                var hvec = AvailList.hvec;
                var hvoc = AvailList.hvoc;
                var hvctayn = AvailList.hvctayn;
                var hvmriayn = AvailList.hvmriayn;
                var hvgc = AvailList.hvgc;
                var hv28 = AvailList.hv28;  // 소아응급
                var hv27 = AvailList.hv27;
                var hv29 = AvailList.hv29;
                var hv30 = AvailList.hv30;
                var hvcc = AvailList.hvcc;
                var hvncc = AvailList.hvncc;
                var hvccc = AvailList.hvccc;
                var hvicc = AvailList.hvicc;
                var hv2 = AvailList.hv2;
                var hv3 = AvailList.hv3;
                var hv6 = AvailList.hv6;
                var hv7 = AvailList.hv7;
                var hv8 = AvailList.hv8;
                var hv9 = AvailList.hv9;
                var hv4 = AvailList.hv4;
                var hv5 = AvailList.hv5;

                var card_header = $('<div class="card-header" style="text-align:center;">');

                // 기본 정보
                var card_name = $('<p class="card-title" style="font-size: 1.2rem; font-weight:bold; margin-top: 1.5rem;">').text(dutyname);
                var card_addr = $('<p style="font-size: 0.9rem; font-weight:bold;">').text(dutyaddr);
                var card_tel = $('<p style="font-size: 0.9rem; font-weight:bold;">').text("응급실 연락처 : " + dutytel);

                card_header.append($('<p class="shutDownBtn" style="float: right; cursor: pointer;">').text("X"));

                card_header.append(card_name);
                card_header.append(card_addr);
                card_header.append(card_tel);

                // 업데이트 시간
                updateTime = AvailList.hvidate;
                year = updateTime.slice(0, 4);
                month = updateTime.slice(4, 6);
                day = updateTime.slice(6, 8);
                hour = updateTime.slice(8, 10);
                min = updateTime.slice(10, 12);
                sec = updateTime.slice(12);

                updateWrite = year + '년 ' + month + '월 ' + day + '일 ' + hour + '시 ' + min + '분 ' + sec + '초 기준';
                console.log(updateWrite);

                // 토글
                var toggle_menu = $('<div class="toggle-menu" style="cursor:default;">');
                var toggle_button = $('<div class="toggle-button" onclick="toggleMenu(this)">');
                var toggle_text = $('<span id="toggle-text" style="font-size: 0.9rem;">').text('운영시간 ▼');
                var menu = $('<div class="menu" style="display: none; margin: 0.3rem; font-size: 0.8rem;">');
                var menu_item_mon = $('<div class="menu-item" onclick="menuItemClicked(this)">').text("월요일 : " + availtime[0]);
                var menu_item_tue = $('<div class="menu-item" onclick="menuItemClicked(this)">').text("화요일 : " + availtime[1]);
                var menu_item_wed = $('<div class="menu-item" onclick="menuItemClicked(this)">').text("수요일 : " + availtime[2]);
                var menu_item_thu = $('<div class="menu-item" onclick="menuItemClicked(this)">').text("목요일 : " + availtime[3]);
                var menu_item_fri = $('<div class="menu-item" onclick="menuItemClicked(this)">').text("금요일 : " + availtime[4]);
                var menu_item_sat = $('<div class="menu-item" onclick="menuItemClicked(this)">').text("토요일 : " + availtime[5]);
                var menu_item_sun = $('<div class="menu-item" onclick="menuItemClicked(this)">').text("일요일 : " + availtime[6]);
                var menu_item_holi = $('<div class="menu-item" onclick="menuItemClicked(this)">').text("공휴일 : " + availtime[7]);


                var card_hospPoss = $('<p class="card-title" style="text-align:right; margin-top: 1rem; margin-bottom: 0;">').text("수용가능인원 및 가용여부");
                var kid_poss = $('<img style="height: 30px; float: left; margin-top: 14px;">').attr('src', '/img/kid_white.png');

                toggle_button.append(toggle_text);
                menu.append(menu_item_mon);
                menu.append(menu_item_tue);
                menu.append(menu_item_wed);
                menu.append(menu_item_thu);
                menu.append(menu_item_fri);
                menu.append(menu_item_sat);
                menu.append(menu_item_sun);
                menu.append(menu_item_holi);

                toggle_menu.append(toggle_button);
                toggle_menu.append(menu);
                card_header.append(toggle_menu);

                if (hv28 != "-") {
                    card_header.append(kid_poss);
                }
                card_header.append(card_hospPoss);

                var card_body = $('<div class="card-body" style="background-color: white; font-family: Arial, Helvetica, sans-serif; color:black; border-radius: 0px 0px 20px 20px;">');
                var card_info = $('<div class="card-info">');

                card_info.append($('<p style="color: gray; margin: 0 0 0 0; font-size: 0.7rem;">').text(updateWrite));
                card_info.append($('<hr style="margin-top: 0; margin-bottom: 0;">'));

                // 응급실
                var dashboard_item_hvec = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hvec = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 9.5rem;">').text("응급실");
                var hospPoss_hvec_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hvec + "명");

                if (parseInt(hvec) == 0) {
                    var card = $('<div class="card" style="position:absolute; top: 10px; right: 10px; z-index: 10; border-radius: 20px 20px 20px 20px; border: 2px solid #ccc; background-color: rgb(208, 53, 31, 0.8); color: #fff; width: calc(100vw / 5);">');
                    dashboard_item_hvec.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvec) < 0) {
                    var card = $('<div class="card" style="position:absolute; top: 10px; right: 10px; z-index: 10; border-radius: 20px 20px 20px 20px; border: 2px solid #ccc; background-color: rgb(208, 53, 31, 0.8); color: #fff; width: calc(100vw / 5);">');
                    dashboard_item_hvec.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hvec.css('margin-right', '9.2rem');
                } else if (parseInt(hvec) <= 4) {
                    var card = $('<div class="card" style="position:absolute; top: 10px; right: 10px; z-index: 10; border-radius: 20px 20px 20px 20px; border: 2px solid #ccc; background-color: rgb(241, 157, 57, 0.8); color: #fff; width: calc(100vw / 5);">');
                    dashboard_item_hvec.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvec) <= 9) {
                    var card = $('<div class="card" style="position:absolute; top: 10px; right: 10px; z-index: 10; border-radius: 20px 20px 20px 20px; border: 2px solid #ccc; background-color: rgb(247, 208, 77, 0.8); color: #fff; width: calc(100vw / 5);">');
                    dashboard_item_hvec.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hvec == "-") {
                    var card = $('<div class="card" style="position:absolute; top: 10px; right: 10px; z-index: 10; border-radius: 20px 20px 20px 20px; border: 2px solid #ccc; background-color: rgb(208, 53, 31, 0.8); color: #fff; width: calc(100vw / 5);">');
                    dashboard_item_hvec.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    var card = $('<div class="card" style="position:absolute; top: 10px; right: 10px; z-index: 10; border-radius: 20px 20px 20px 20px; border: 2px solid #ccc; background-color: rgb(103, 216, 136, 0.8); color: #fff; width: calc(100vw / 5);">');
                    dashboard_item_hvec.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hvec.append(hospPoss_hvec);
                dashboard_item_hvec.append(hospPoss_hvec_cnt);
                card_info.append(dashboard_item_hvec);

                // 수술실
                var dashboard_item_hvoc = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hvoc = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 9.5rem;">').text("수술실");
                var hospPoss_hvoc_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hvoc + "명");

                if (parseInt(hvoc) == 0) {
                    dashboard_item_hvoc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvoc) < 0) {
                    dashboard_item_hvoc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hvoc.css('margin-right', '9.2rem');
                } else if (parseInt(hvoc) <= 4) {
                    dashboard_item_hvoc.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvoc) <= 9) {
                    dashboard_item_hvoc.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hvoc == "-") {
                    dashboard_item_hvoc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hvoc.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hvoc.append(hospPoss_hvoc);
                dashboard_item_hvoc.append(hospPoss_hvoc_cnt);
                card_info.append(dashboard_item_hvoc);


                // 소아응급
                var dashboard_item_hv28 = $('<div class="dashboard-item" style="display: flex; margin:1em; margin-bottom: 0;">');
                var hospPoss_hv28 = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 9rem;">').text("소아응급");
                var hospPoss_hv28_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hv28 + "명");

                if (parseInt(hv28) == 0) {
                    dashboard_item_hv28.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv28) < 0) {
                    dashboard_item_hv28.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hv28.css('margin-right', '9.2rem');
                } else if (parseInt(hv28) <= 4) {
                    dashboard_item_hv28.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv28) <= 9) {
                    dashboard_item_hv28.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hv28 == "-") {
                    dashboard_item_hv28.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hv28.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hv28.append(hospPoss_hv28);
                dashboard_item_hv28.append(hospPoss_hv28_cnt);
                card_info.append(dashboard_item_hv28);
                card_info.append($('<hr style="margin-top: 0; margin-bottom: 0;">'));

                // 그 외 정보(스크롤)
                var scrollInfo = $('<div style="overflow-y:scroll; height:300px;">');

                // CT
                var dashboard_item_hvctayn = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hvctayn = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 9.5rem;">').text("CT");

                if (hvctayn == "Y") {
                    dashboard_item_hvctayn.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    var hospPoss_hvctayn_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text("사용가능");
                } else {
                    dashboard_item_hvctayn.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    var hospPoss_hvctayn_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text("사용불가");
                }
                dashboard_item_hvctayn.append(hospPoss_hvctayn);
                dashboard_item_hvctayn.append(hospPoss_hvctayn_cnt);
                scrollInfo.append(dashboard_item_hvctayn);

                // MRI
                var dashboard_item_hvmriayn = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hvmriayn = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 9rem;">').text("MRI");

                if (hvmriayn == "Y") {
                    dashboard_item_hvmriayn.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    var hospPoss_hvmriayn_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text("사용가능");
                } else {
                    dashboard_item_hvmriayn.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    var hospPoss_hvmriayn_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text("사용불가");
                }
                dashboard_item_hvmriayn.append(hospPoss_hvmriayn);
                dashboard_item_hvmriayn.append(hospPoss_hvmriayn_cnt);
                scrollInfo.append(dashboard_item_hvmriayn);

                // 입원실
                var dashboard_item_hvgc = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hvgc = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 9.5rem;">').text("입원실");
                var hospPoss_hvgc_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hvgc + "명");

                if (parseInt(hvgc) == 0) {
                    dashboard_item_hvgc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvgc) < 0) {
                    dashboard_item_hvgc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hvgc.css('margin-right', '9.2rem');
                } else if (parseInt(hvgc) <= 4) {
                    dashboard_item_hvgc.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvgc) <= 9) {
                    dashboard_item_hvgc.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hvgc == "-") {
                    dashboard_item_hvgc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hvgc.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hvgc.append(hospPoss_hvgc);
                dashboard_item_hvgc.append(hospPoss_hvgc_cnt);
                scrollInfo.append(dashboard_item_hvgc);

                // 코호트 격리
                var dashboard_item_hv27 = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hv27 = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 7.9rem;">').text("코호트 격리");
                var hospPoss_hv27_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hv27 + "명");

                if (parseInt(hv27) == 0) {
                    dashboard_item_hv27.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv27) < 0) {
                    dashboard_item_hv27.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hv27.css('margin-right', '9.2rem');
                } else if (parseInt(hv27) <= 4) {
                    dashboard_item_hv27.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv27) <= 9) {
                    dashboard_item_hv27.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hv27 == "-") {
                    dashboard_item_hv27.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hv27.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hv27.append(hospPoss_hv27);
                dashboard_item_hv27.append(hospPoss_hv27_cnt);
                scrollInfo.append(dashboard_item_hv27);

                // 음압격리
                var dashboard_item_hv29 = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hv29 = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 9rem;">').text("음압격리");
                var hospPoss_hv29_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hv29 + "명");

                if (parseInt(hv29) == 0) {
                    dashboard_item_hv29.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv29) < 0) {
                    dashboard_item_hv29.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hv29.css('margin-right', '9.2rem');
                } else if (parseInt(hv29) <= 4) {
                    dashboard_item_hv29.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv29) <= 9) {
                    dashboard_item_hv29.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hv29 == "-") {
                    dashboard_item_hv29.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hv29.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hv29.append(hospPoss_hv29);
                dashboard_item_hv29.append(hospPoss_hv29_cnt);
                scrollInfo.append(dashboard_item_hv29);

                // 일반격리
                var dashboard_item_hv30 = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hv30 = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 9rem;">').text("일반격리");
                var hospPoss_hv30_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hv30 + "명");

                if (parseInt(hv30) == 0) {
                    dashboard_item_hv30.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv30) < 0) {
                    dashboard_item_hv30.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hv30.css('margin-right', '9.2rem');
                } else if (parseInt(hv30) <= 4) {
                    dashboard_item_hv30.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv30) <= 9) {
                    dashboard_item_hv30.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hv30 == "-") {
                    dashboard_item_hv30.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hv30.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hv30.append(hospPoss_hv30);
                dashboard_item_hv30.append(hospPoss_hv30_cnt);
                scrollInfo.append(dashboard_item_hv30);

                // 신경중환자
                var dashboard_item_hvcc = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hvcc = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 8.2rem;">').text("신경중환자");
                var hospPoss_hvcc_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hvcc + "명");

                if (parseInt(hvcc) == 0) {
                    dashboard_item_hvcc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvcc) < 0) {
                    dashboard_item_hvcc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hvcc.css('margin-right', '9.2rem');
                } else if (parseInt(hvcc) <= 4) {
                    dashboard_item_hvcc.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvcc) <= 9) {
                    dashboard_item_hvcc.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hvcc == "-") {
                    dashboard_item_hvcc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hvcc.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hvcc.append(hospPoss_hvcc);
                dashboard_item_hvcc.append(hospPoss_hvcc_cnt);
                scrollInfo.append(dashboard_item_hvcc);

                // 신생중환자
                var dashboard_item_hvncc = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hvncc = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 8.2rem;">').text("신생중환자");
                var hospPoss_hvncc_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hvncc + "명");

                if (parseInt(hvncc) == 0) {
                    dashboard_item_hvncc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvncc) < 0) {
                    dashboard_item_hvncc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hvncc.css('margin-right', '9.2rem');
                } else if (parseInt(hvncc) <= 4) {
                    dashboard_item_hvncc.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvncc) <= 9) {
                    dashboard_item_hvncc.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hvncc == "-") {
                    dashboard_item_hvncc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hvncc.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hvncc.append(hospPoss_hvncc);
                dashboard_item_hvncc.append(hospPoss_hvncc_cnt);
                scrollInfo.append(dashboard_item_hvncc);

                // 흉부중환자
                var dashboard_item_hvccc = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hvccc = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 8.2rem;">').text("흉부중환자");
                var hospPoss_hvccc_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hvccc + "명");

                if (parseInt(hvccc) == 0) {
                    dashboard_item_hvccc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvccc) < 0) {
                    dashboard_item_hvccc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hvccc.css('margin-right', '9.2rem');
                } else if (parseInt(hvccc) <= 4) {
                    dashboard_item_hvccc.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvccc) <= 9) {
                    dashboard_item_hvccc.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hvccc == "-") {
                    dashboard_item_hvccc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hvccc.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hvccc.append(hospPoss_hvccc);
                dashboard_item_hvccc.append(hospPoss_hvccc_cnt);
                scrollInfo.append(dashboard_item_hvccc);

                // 일반중환자
                var dashboard_item_hvicc = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hvicc = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 8.2rem;">').text("일반중환자");
                var hospPoss_hvicc_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hvicc + "명");

                if (parseInt(hvicc) == 0) {
                    dashboard_item_hvicc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvicc) < 0) {
                    dashboard_item_hvicc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hvicc.css('margin-right', '9.2rem');
                } else if (parseInt(hvicc) <= 4) {
                    dashboard_item_hvicc.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hvicc) <= 9) {
                    dashboard_item_hvicc.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hvicc == "-") {
                    dashboard_item_hvicc.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hvicc.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hvicc.append(hospPoss_hvicc);
                dashboard_item_hvicc.append(hospPoss_hvicc_cnt);
                scrollInfo.append(dashboard_item_hvicc);

                // 내과중환자
                var dashboard_item_hv2 = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hv2 = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 8.2rem;">').text("내과중환자");
                var hospPoss_hv2_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hv2 + "명");

                if (parseInt(hv2) == 0) {
                    dashboard_item_hv2.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv2) < 0) {
                    dashboard_item_hv2.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hv2.css('margin-right', '9.2rem');
                } else if (parseInt(hv2) <= 4) {
                    dashboard_item_hv2.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv2) <= 9) {
                    dashboard_item_hv2.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hv2 == "-") {
                    dashboard_item_hv2.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hv2.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hv2.append(hospPoss_hv2);
                dashboard_item_hv2.append(hospPoss_hv2_cnt);
                scrollInfo.append(dashboard_item_hv2);

                // 외과중환자
                var dashboard_item_hv3 = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hv3 = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 8.2rem;">').text("외과중환자");
                var hospPoss_hv3_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hv3 + "명");

                if (parseInt(hv3) == 0) {
                    dashboard_item_hv3.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv3) < 0) {
                    dashboard_item_hv3.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hv3.css('margin-right', '9.2rem');
                } else if (parseInt(hv3) <= 4) {
                    dashboard_item_hv3.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv3) <= 9) {
                    dashboard_item_hv3.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hv3 == "-") {
                    dashboard_item_hv3.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hv3.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hv3.append(hospPoss_hv3);
                dashboard_item_hv3.append(hospPoss_hv3_cnt);
                scrollInfo.append(dashboard_item_hv3);

                // 신경외과중환자
                var dashboard_item_hv6 = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hv6 = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; width: 60%; margin-right: 2.3rem;">').text("신경외과중환자");
                var hospPoss_hv6_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hv6 + "명");

                if (parseInt(hv6) == 0) {
                    dashboard_item_hv6.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv6) < 0) {
                    dashboard_item_hv6.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hv6.css('margin-right', '9.2rem');
                } else if (parseInt(hv6) <= 4) {
                    dashboard_item_hv6.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv6) <= 9) {
                    dashboard_item_hv6.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hv6 == "-") {
                    dashboard_item_hv6.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hv6.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hv6.append(hospPoss_hv6);
                dashboard_item_hv6.append(hospPoss_hv6_cnt);
                scrollInfo.append(dashboard_item_hv6);

                // 약물중환자
                var dashboard_item_hv7 = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hv7 = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; width: 50%; margin-right: 1.8rem;">').text("약물중환자");
                var hospPoss_hv7_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hv7 + "명");

                if (hv7 == "Y") {
                    dashboard_item_hv7.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    var hospPoss_hv7_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text("사용가능");
                } else {
                    dashboard_item_hv7.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    var hospPoss_hv7_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text("사용불가");
                }
                dashboard_item_hv7.append(hospPoss_hv7);
                dashboard_item_hv7.append(hospPoss_hv7_cnt);
                scrollInfo.append(dashboard_item_hv7);

                // 화상중환자
                var dashboard_item_hv8 = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var hospPoss_hv8 = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 8.3rem;">').text("화상중환자");
                var hospPoss_hv8_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hv8 + "명");

                if (parseInt(hv8) == 0) {
                    dashboard_item_hv8.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv8) < 0) {
                    dashboard_item_hv8.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hv8.css('margin-right', '9.2rem');
                } else if (parseInt(hv8) <= 4) {
                    dashboard_item_hv8.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv8) <= 9) {
                    dashboard_item_hv8.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hv8 == "-") {
                    dashboard_item_hv8.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hv8.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hv8.append(hospPoss_hv8);
                dashboard_item_hv8.append(hospPoss_hv8_cnt);
                scrollInfo.append(dashboard_item_hv8);

                // 외상중환자
                var dashboard_item_hv9 = $('<div class="dashboard-item" style="display: flex; margin:1em;">');
                var dashboard_hv9_img = $('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">');
                var hospPoss_hv9 = $('<p style="text-align: left; font-weight:bold; font-size: 1rem; vertical-align: middle; margin-right: 8.3rem;">').text("외상중환자");
                var hospPoss_hv9_cnt = $('<p class="dashboard-value" style="text-align: right; font-weight:bold; font-size: 1rem;">').text(hv9 + "명");

                if (parseInt(hv9) == 0) {
                    dashboard_item_hv9.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv9) < 0) {
                    dashboard_item_hv9.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                    hospPoss_hv9.css('margin-right', '9.2rem');
                } else if (parseInt(hv9) <= 4) {
                    dashboard_item_hv9.append($('<img src="/img/cir_o.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (parseInt(hv9) <= 9) {
                    dashboard_item_hv9.append($('<img src="/img/cir_y.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else if (hv9 == "-") {
                    dashboard_item_hv9.append($('<img src="/img/cir_r.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                } else {
                    dashboard_item_hv9.append($('<img src="/img/cir_g.png" style="width: 12px; height: 12px; margin-top: 5px; margin-right: 1rem;">'));
                }
                dashboard_item_hv9.append(hospPoss_hv9);
                dashboard_item_hv9.append(hospPoss_hv9_cnt);
                scrollInfo.append(dashboard_item_hv9);


                card_info.append(scrollInfo);
                card_body.append(card_info);

                card.append(card_header);
                card.append(card_body);
                $("#HospInfoCard").append(card);

                // 해당 병원으로 지도 포커싱
                var wgslat = parseFloat(LocateList.wgslat);
                var wgslon = parseFloat(LocateList.wgslon);

                var allLoc = new kakao.maps.LatLng(wgslat, wgslon);
                map.setCenter(allLoc);
                map.setLevel(4);

            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    $(document).on('click', '.shutDownBtn', function(event) {
        $("#HospInfoCard").empty();
    });
});
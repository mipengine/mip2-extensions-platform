import "./index.less";

export default class MIPNjtAd extends MIP.CustomElement {
  build() {
    /**
     * 构造元素，只会运行一次
     */
    let element = document.querySelectorAll("mip-njt-ad")[0];
    let ajaxIps = !!element.getAttribute("ajaxIp")
      ? element.getAttribute("ajaxIp")
      : "/API/IP.ashx?action=js";
    // TODO
    let ajaxXml = element.getAttribute("ajaxXml") || "/adm/15.xml";
    let ajaxIp = ajaxIps;
    let pagename = element.getAttribute("pagename");
    let ptypeid = element.getAttribute("ptypeid");
    let pcategoryid = element.getAttribute("pcategoryid");
    let adplace = element.getAttribute("adplace");
    let remoteIpInfo = false;

    adplace = adplace ? adplace.split(",") : ["m_b1"];

    loadXml();

    function loadXml() {
      $.ajax({
        type: "GET",
        url: ajaxXml,
        dataType: "xml",
        success: function(responsexml) {
          let isLbs = false; //是否开启地理位置定向策略
          for (let x in adplace) {
            $(responsexml)
              .find("adplace")
              .each(function() {
                if (
                  $(this)
                    .find("placeName")
                    .text() === adplace[x]
                ) {
                  $(this)
                    .find("item")
                    .each(function() {
                      let flag1 =
                        $(this)
                          .find("pagename")
                          .text().length == 0 ||
                        $(this)
                          .find("pagename")
                          .text()
                          .split(",")
                          .indexOf(pagename) >= 0;
                      let flag2 =
                        $(this)
                          .find("typeid")
                          .text().length == 0 ||
                        $(this)
                          .find("typeid")
                          .text()
                          .split(",")
                          .indexOf(ptypeid.toString()) >= 0;
                      let flag3 =
                        $(this)
                          .find("categoryid")
                          .text().length == 0 ||
                        $(this)
                          .find("categoryid")
                          .text()
                          .split(",")
                          .indexOf(pcategoryid.toString()) >= 0;
                      let flag4 =
                        $(this)
                          .find("province")
                          .text().length > 0 ||
                        $(this)
                          .find("city")
                          .text().length > 0;
                      if (!!flag1 && !!flag2 && !!flag3 && !!flag4) {
                        isLbs = true;
                        return false;
                      }
                    });
                }
              });
          }
          if (!!isLbs) {
            loadIp(responsexml);
          }
        }
      });
    }
    function loadIp(responsexml) {
      $.ajax({
        type: "GET",
        url: ajaxIp,
        dataType: "script",
        success: function() {
          if (remote_ip_info) {
            if (remote_ip_info.ret === 1) {
              for (let i = 0; i < adplace.length; i++) {
                loadadm(
                  responsexml,
                  remote_ip_info.province,
                  remote_ip_info.city,
                  adplace[i]
                );
              }
            } else {
              for (let i = 0; i < adplace.length; i++) {
                loadadm(responsexml, "", "", adplace[i]);
              }
            }
          } else {
            for (let i = 0; i < adplace.length; i++) {
              loadadm(responsexml, "", "", adplace[i]);
            }
            let errReportStr =
              '<img src="https://error-report.danongchang.cn/img.aspx?Appname=njtwap&priority=10&Url=' +
              window.location.href +
              '&Errcode=njtwap" />';
            $(errReportStr).appendTo(document.body);
          }
        },
        error: function(e) {
          checkAdmIPajax(responsexml);
        }
      });
    }
    function loadadm(admxml, province, city, placeName) {
      $(admxml)
        .find("adplace")
        .each(function() {
          if (
            $(this)
              .find("placeName")
              .text() === placeName
          ) {
            $(this)
              .find("item")
              .each(function() {
                let flag1 =
                  $(this)
                    .find("pagename")
                    .text() === "" ||
                  $(this)
                    .find("pagename")
                    .text()
                    .split(",")
                    .indexOf(pagename) >= 0;
                let flag2 =
                  $(this)
                    .find("typeid")
                    .text() === "" ||
                  $(this)
                    .find("typeid")
                    .text()
                    .split(",")
                    .indexOf(ptypeid) >= 0;
                let flag3 =
                  $(this)
                    .find("categoryid")
                    .text() === "" ||
                  $(this)
                    .find("categoryid")
                    .text()
                    .split(",")
                    .indexOf(pcategoryid) >= 0;
                let flag4 =
                  $(this)
                    .find("province")
                    .text() === "" ||
                  $(this)
                    .find("province")
                    .text()
                    .indexOf(province) >= 0 ||
                  province.indexOf(
                    $(this)
                      .find("province")
                      .text()
                  ) >= 0;
                let flag5 =
                  $(this)
                    .find("city")
                    .text() === "" ||
                  $(this)
                    .find("city")
                    .text()
                    .indexOf(city) >= 0 ||
                  city.indexOf(
                    $(this)
                      .find("city")
                      .text()
                  ) >= 0;
                if (flag1 && flag2 && flag3 && flag4 && flag5) {
                  $("#" + placeName)
                    .html(
                      $(this)
                        .find("adcode")
                        .text()
                    )
                    .css("overflow", "hidden")
                    .find("img")
                    .css({
                      display: "block",
                      "max-width": "100%",
                      margin: "2% auto"
                    });
                  return false;
                }
              });
            return false;
          }
        });
    }
    function checkAdmIPajax(responsexml) {
      for (let i = 0; i < adplace.length; i++) {
        loadadm(responsexml, "", "", adplace[i]);
      }
      let errReportStr =
        '<img src="https://error-report.danongchang.cn/img.aspx?Appname=njtwap&priority=5&Url=' +
        window.location.href +
        '&Errcode=admipajax" />';
      $(errReportStr).appendTo(document.body);
    }
  }
}

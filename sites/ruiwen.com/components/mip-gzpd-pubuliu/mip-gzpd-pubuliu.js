import './mip-gzpd-pubuliu.less'



export default class MIPGzpdPubuliu extends MIP.CustomElement {
    build() {
        var _this = this;
        this.wrapper = document.createElement('ul');
        this.wrapper.classList.add('index_list');
        this.element.appendChild(this.wrapper);
        this.page = 1;
        this.flag = false;
        this.getList();
        this.down();
        MIP.viewport.on('scroll', function () {
            if (MIP.viewport.getHeight() + MIP.viewport.getScrollTop() > MIP.viewport.getScrollHeight() - 300 && !_this.flag) {
                _this.page++;
                _this.getList()
            }
        });
    }

    down() {
        let pathname = location.pathname;
        let lala = '//' + location.host;
        var star = 0;
        for (var i = 0; i < pathname.length; i++) {
            star = parseInt(star) + parseInt(pathname.charCodeAt(i));
        }
        var str = '';
        if (star % 5 < 3) {
            for (i = 0; i < 4; i++) {
                str += '<mip-img src="https://static.yjbys.com/img/wenku/icon/icon_star.png" alt=""></mip-img>\n';
            }
            str += '<mip-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABbUlEQVQ4T5XSvUscURQF8HNGFtbexdJSkAVFWLDI6tyHNjaCKDY2aQSxsEthYRfERlKkSJp0ghgCou3uvBciq2CK1UJQ8G+wXQU9YWQVP2Z242umuGd+3HvfIzoc7/0kgJaZHebF2AU4A3BjZpV3A0mSzJL8lf4oacY5t5+FZHYgKfLen5McbAMXZjZE8v41kgmEED5K+vEqvGhm22+AWq3WT3KY5AiAkfQraZBk9Dws6Y7kJYBTAE1JzWKxeELv/RcAq52WmVeTtMX2vAckp9+J7MVxPPuwg0aj0dtqtQ5Jjv4nclwqlSbK5fLt0xK9932S/pIc6IRIuioUCpVqtXqd5l7cQghhXtJuF2DOOffwPt4A3vsVAF+7jLFsZt8ygSRJNkl+6tLBhnNuLa+DHQALj0VJv0n2APjwDN02s8U84AjAGID0RtbjOPZpsF6vuyiKPrdrf8xsPA/4CeC7mdWyxgghTElaMrP5x/o/7luTOvqPkx0AAAAASUVORK5CYII=" ></mip-img>'

        } else {
            for (i = 0; i < 5; i++) {
                str += '<mip-img src="https://static.yjbys.com/img/wenku/icon/icon_star.png" alt="" ></mip-img>\n';
            }
        }
        if (location.host.indexOf('yjbys') != -1) {
            lala = '//m.yjbys.com';
        } else {
            lala = lala.replace('mip.', 'm.');
        }
        let d = '<a href="' + lala + '/dldoc/index' + pathname + '" target="_blank" class="download_card">\n' +
            '        <div class="download_card_msg">\n' +
            '            <div class="download_card_title" style="text-decoration:none;">《' + document.title + '.doc》</div>\n' +
            '            <div class="download_card_tip">将本文的Word文档下载，方便收藏和打印</div>\n' +
            '            <div class="download_card_tj">\n' +
            '                <span>推荐度：</span>\n' + str +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="download_card_btn">\n' +
            '            <mip-img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU2MjU5MTk0MTg2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY0MDciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTQzMiAwaDE2MGMyNi42IDAgNDggMjEuNCA0OCA0OHYzMzZoMTc1LjRjMzUuNiAwIDUzLjQgNDMgMjguMiA2OC4yTDUzOS40IDc1Ni42Yy0xNSAxNS0zOS42IDE1LTU0LjYgMEwxODAuMiA0NTIuMmMtMjUuMi0yNS4yLTcuNC02OC4yIDI4LjItNjguMkgzODRWNDhjMC0yNi42IDIxLjQtNDggNDgtNDh6IG01OTIgNzUydjIyNGMwIDI2LjYtMjEuNCA0OC00OCA0OEg0OGMtMjYuNiAwLTQ4LTIxLjQtNDgtNDhWNzUyYzAtMjYuNiAyMS40LTQ4IDQ4LTQ4aDI5My40bDk4IDk4YzQwLjIgNDAuMiAxMDUgNDAuMiAxNDUuMiAwbDk4LTk4SDk3NmMyNi42IDAgNDggMjEuNCA0OCA0OHogbS0yNDggMTc2YzAtMjItMTgtNDAtNDAtNDBzLTQwIDE4LTQwIDQwIDE4IDQwIDQwIDQwIDQwLTE4IDQwLTQweiBtMTI4IDBjMC0yMi0xOC00MC00MC00MHMtNDAgMTgtNDAgNDAgMTggNDAgNDAgNDAgNDAtMTggNDAtNDB6IiBmaWxsPSIjZmZmZmZmIiBwLWlkPSI2NDA4Ij48L3BhdGg+PC9zdmc+" alt="" ></mip-img>\n' +
            '            <div class="downlod_btn_right">下载文档</div>\n' +
            '        </div>\n' +
            '    </a>';
        let flag = true;
        let bmd = ['jianlixiazai', 'yjbys.com/company', 'yjbys.com/zhaopin', 'yjbys.com/mingqi', 'yjbys.com/gaoxiao', 'yjbys.com/sydwzp', 'yjbys.com/xuanjianghui', 'yjbys.com/zhaopinhui'];
        for (var i = 0; i < bmd.length; i++) {
            if (location.href.indexOf(bmd[i]) != -1) {
                flag = false;
                break;

            }
        }
        let more = document.getElementsByClassName('more')[0];
        let content = document.getElementsByClassName('content')[0];
        if (more && flag) {
            more.outerHTML += d;
        }
        if (!more && content && flag) {
            content.outerHTML += d;
        }
    }

    getList() {
        var _this = this;
        this.flag = true;
        let resize3 = '?x-oss-process=image/resize,m_fill,w_229,h_120';
        let resize = '?x-oss-process=image/resize,m_fill,w_120,h_84';
        let SynH_j1 = ['\x72\x75\x69\x77\x65\x6e', '\x79\x6a\x62\x79\x73', '\x6a\x79\x31\x33\x35', '\x6a\x79\x31\x33\x35', '\x63\x6e\x66\x6c\x61', '\x6f\x68\x31\x30\x30', '\x63\x6e\x72\x65\x6e\x63\x61\x69', '\x6a\x79\x31\x33\x35', '\x70\x69\x6e\x63\x61\x69']
        let nIsAikGD2 = 0, MTQFVS3 = SynH_j1["\x6c\x65\x6e\x67\x74\x68"] - 1
        let hM4 = SynH_j1[window["\x4d\x61\x74\x68"]["\x66\x6c\x6f\x6f\x72"](window["\x4d\x61\x74\x68"]["\x72\x61\x6e\x64\x6f\x6d"]() * (MTQFVS3 - nIsAikGD2 + 1) + nIsAikGD2)] + '\x2e\x63\x6f\x6d'
        let url = '\x2f\x2f\x77\x77\x77\x2e' + hM4 + '\x2f\x72\x65\x6c\x61\x74\x65\x2f\x61\x72\x74\x69\x63\x6c\x65';
        let str = '';
        fetchJsonp(`${url}?page=${this.page}&keyword=${document.title}`)
            .then(function (data) {
                // 处理响应数据
                return data.json()
            }).then(function (res) {
            if (res.code == 200) {
                for (let i = 0; i < res.list.length; i++) {
                    let row = res.list[i];
                    str += '<div class="pic1 lipic-' + i + '">';
                    if (row.img.length > 0) {
                        if (row.img.length >= 3) {
                            str += '<div class="pic_img_3"><a target="_blank" href="' + row.url + '"><div class="pic_inner_img_3"><mip-img src="' + row.img[0] + resize3 + '"></div><div class="pic_inner_img_3"><mip-img src="' + row.img[1] + resize3 + '"></div><div class="pic_inner_img_3"><mip-img src="' + row.img[2] + resize3 + '"></div></a></div>'
                            str += '<div class="pic_art pic_art_3"><a target="_blank" href="' + row.url + '"><h2>' + row.title + '</h2></a></div>'
                        } else {
                            str += '<div class="pic_img"><a target="_blank" href="' + row.url + '"><div class="pic_inner_img"><mip-img src="' + row.img[0] + resize + '"></div></a></div>'
                            str += '<div class="pic_art"><a target="_blank" href="' + row.url + '"><h2>' + row.title + '</h2></a><p>' + row.description + '</p><div class="time">' + row.pubdate + '</div></div>'
                        }
                    } else {
                        str += '<div class="pic_art"><a target="_blank" href="' + row.url + '"><h2>' + row.title + '</h2></a></div>'
                    }
                    str += '</div>';
                }
                _this.wrapper.innerHTML += str;
            }
            _this.flag = false;
        }).catch(function (ex) {
            _this.flag = false;
        })
    }
}

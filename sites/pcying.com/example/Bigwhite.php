<?php

class Bigwhite_
{
    function GetTm($z)
    {
        if($z>9){
            return $z;
        }else{
            return "0".$z;
        }
    }

    function GetJnd($need,$c1,$c2,$c3,$c4,$kj,$qh)
    {
        global $c1;
        global $c2;
        global $c3;
        global $c4;
        global $kj;
        global $qh;
        global $sj;

        $data = $this->curlPost('http://222.186.43.164:8091/api?token=c942bf06398c72f1&code=jnd28&rows='.$need.'&format=json');

        $data = array_map(function($item) {
            $arr = $item->opencode;
            $sum = 0;
            foreach (explode(',',$arr) as $value){
                $sum+=$value;
            }
            return 'issue:'.$item->expect.',time:'.$item->opentime.',code:'.$this->GetTm($sum).',codes:'.$item->opencode;
        }, $data->data);

        $number = $data;

        for($x=0; $x<=$need;$x++)
        {
            $qq=0;

            $qh[$x]=substr ($number[$x],$qq+6,7);
            $sj[$x]=substr ($number[$x],$qq+19,19);

            $jgfg=array();
            $jgfg=explode(",",substr ($number[$x],$qq+53,5));

            $c1[$x]=$jgfg[0];
            $c2[$x]=$jgfg[1];
            $c3[$x]=$jgfg[2];

            $c4[$x]=intval($jgfg[0])+intval($jgfg[1])+intval($jgfg[2]);

            $kj[$x]=$jgfg[0]." + ".$jgfg[1]." + ".$jgfg[2]." = ".$this->GetTm($c4[$x]);
        }

    }

    function GetJndTime($sj)
    {
        $djs=strtotime(date("Y-m-d H:i:s",strtotime("+210 seconds",strtotime($sj))))-time();
        return $djs;
    }

    function curlPost($url, $data = array(), $contentType = 'application/x-www-form-urlencoded')
    {
        $curl = curl_init(); // 启动一个CURL会话
        curl_setopt($curl, CURLOPT_URL,  $url); // 要访问的地址
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查
        curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // 模拟用户使用的浏览器
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
        curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data); // Post提交的数据包
        curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环
        curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回
        $tmpInfo = curl_exec($curl); // 执行操作
        if (curl_errno($curl)) {
            return 'Errno' . curl_error($curl);
        }
        curl_close($curl); // 关键CURL会话
        $data = json_decode($tmpInfo);

        return $data;
    }
}

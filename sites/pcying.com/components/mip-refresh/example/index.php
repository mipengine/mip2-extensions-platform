<?php
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('PRC');

require("Bigwhite.php");
$bg=new Bigwhite_();
$c1=array();
$c2=array();
$c3=array();
$c4=array();
$qh=array();
$sj=array();
$kj=array();

$bg->GetJnd(5,$c1,$c2,$c3,$c4,$kj,$qh,$sj);
?>

<!DOCTYPE html>
<html mip>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,user-scalable=no">
    <title>倒计时刷新</title>
    <link rel="canonical" href="对应的原页面地址">
    <link rel="stylesheet" href="https://c.mipcdn.com/static/v2/mip.css">
</head>
<body>
<div>
    <table>
        <tbody>
        <tr>
            <td><?php echo $qh[0]+1?></td>
            <td><span id="Times"></span></td>
        </tr>
        </tbody>
    </table>

    <mip-refresh refresh-cTime="<?php echo $bg->GetJndTime($sj[0]);?>" refresh-newData="<?php echo $qh[0] + 1?>" refresh-type="1"></mip-refresh>
</div>
<script src="https://c.mipcdn.com/static/v2/mip.js"></script>
<script src="/mip-refresh/mip-refresh.js"></script>
</body>
</html>


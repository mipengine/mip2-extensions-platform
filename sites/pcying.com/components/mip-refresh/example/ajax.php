<?php
header("Content-type:text/html;charset=utf-8");
$type= $_POST["type"];
$issue= $_POST["issue"];

if($type==1){
    require("Bigwhite.php");
    $bg=new Bigwhite_();
    $data = $bg->curlPost('http://222.186.43.164:8091/api?token=c942bf06398c72f1&code=jnd28&rows=5&format=json');
    $data = array_map(function($item) {
        $arr = $item->opencode;
        $sum = 0;
        foreach (explode(',',$arr) as $value){
            $sum+=$value;
        }
        return 'issue:'.$item->expect.',time:'.$item->opentime.',code:'.$sum.',codes:'.$item->opencode;
    }, $data->data);
    $number = $data;
    $qh=substr ($number[0],6,7);
}

if($qh == $issue){
    $arr = array("data"=>1,"info"=>"操作成功");
}else{
    $arr = array("data"=>0,"info"=>"操作失败");
}
$jsonStr=json_encode($arr);
echo $jsonStr;

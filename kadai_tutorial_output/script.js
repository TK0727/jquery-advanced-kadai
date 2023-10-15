$(function(){
    //ボタンアニメーション//
$('.button-more').on('mouseover',function(){
    $(this).animate({
        opacity:0.5,
        marginLeft: 20,
    }, 100);
  });

$('.button-more').on('mouseout',function(){
        $(this).animate({
            opacity: 1,
            margin: 0,
        }, 100);
     });
 
// カルーセル
$('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false,
});
// AjaxでSTATIC FORMSにデータを送信
$('#submit').on('click',function(event){
    // 送信拒否
    event.preventDefault();
    // チェックの結果エラーがあるかないか判定
    let result = inputCheck();
    let error =result.error;
    let message =result.message;

    // エラーがなかったらフォームを送信
    if(error==false){
        // Ajaxで送信
        $.ajax({
            url:'https://api.staticforms.xyz/submit',
            type:'POST',
            dataType:'json',
            data: $('#form').serialize(),
            success:function(result){
                alert('お問合せを送信しました')
            },
            error:function(xhr,resp,text){
                alert('お問合せを送信できませんでした。')
            }
        })
    } else{
        // エラーメッセージ表示
        alert(message);
    }
});

$('#name').blur(function(){
    inputCheck();
});
$('#furigana').blur(function(){
    inputCheck();
});
$('#email').blur(function(){
    inputCheck();
});
$('#tel').blur(function(){
    inputCheck();
});
$('#message').blur(function(){
    inputCheck();
});
$('#agree').blur(function(){
    inputCheck();
});

// 問い合わせフォームのチェック
function inputCheck(){
// エラーのチェック結果
let result;
// エラーのメッセージテキスト
let message ='';
// エラーはtrue,なければfalse
let error= false;


// お名前のcheck
if($('#name').val()==''){
$('#name').css('background-color' , '#f79999');
error =true;
message +='お名前を入力して下さい\n';
} else{
$('#name').css('background-color','#fafafa');
}

// フリガナのcheck
if($('#furigana').val()==''){
    $('#furigana').css('background-color' , '#f79999');
    error =true;
    message +='フリガナを入力して下さい\n';
    } else{
    $('#furigana').css('background-color','#fafafa');
    }

// お問合わせのcheck
if($('#message').val()==''){
    $('#message').css('background-color' , '#f79999');
    error =true;
    message +='お問合せ内容を入力して下さい\n';
    } else{
    $('#message').css('background-color','#fafafa');
    }

// メールアドレスのチェック
if($('#email').val() =='' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1){

    $('#email').css('background-color','#f79999');
error = true;
message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';

} else{
    $('#email').css('background-color', '#fafafa');
}
    
if($('#tel').val()!= ''&&$('#tel').val().indexOf('-')== -1){
    $('#tel').css('background-color','#f79999');
    error= true;
    message +='電話番号に「ー」が含まれていません\n';
} else{
    $('#tel').css('background-color','#fafafa')
}
// 個人情報チェックボックスのチェック
if($('#agree').prop('checked')== false){
    error =true;
    message +='個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
}
// エラーの有無で送信ボタン切り替え
if(error == true){
    $('#submit').attr('src' ,'images/button-submit.png');
} else{
    $('#submit').attr('src' , 'images/button-submit-blue.png');
}
 result = {
    error:error,
    message:message
}
// 戻り値としてエラーがあるかどうかを返す
return result;
}
});



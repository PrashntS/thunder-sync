/*var response = '';
$.ajax({
	type: "GET",
	URL: "http://www.google.co.in",
	asyn: false,
	success : function(text)
	{
		response = text;
	}
});
alert(response);
*/

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script type="text/javascript">
        url="http://www.google.co.in";
        var ajaxResult = null;
        function getData(_url){
            $.ajax
            ({
                type: "GET",
                url: _url,
                dataType:"json",
                async: false,
                success: function(response){
                    ajaxResult = response;
                }
            });
        }
        getData(url);

    alert(ajaxResult);

    </script>
</head>
<body>
</body>
</html>
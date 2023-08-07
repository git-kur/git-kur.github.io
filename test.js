    $(document).ready(function() {
            $("#mainButton").click(function() {
                $(this).hide();
                $("#secondaryButton").show();
            });

            $("#secondaryButton").click(function() {
                $(this).hide();
                $("#mainButton").show();
            });
        });

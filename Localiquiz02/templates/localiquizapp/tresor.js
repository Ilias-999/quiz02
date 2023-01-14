<script>
    $(document).ready(function() {
        //setInterval(function() {
        $.ajax({
                type: 'GET',
                url: "{% url 'get_questions' quiz.id %}",
                success: function(response) {
                    let quiz = []
                    for (var key in response.thequestions) {

                        var questiontxt = {
                            q: response.thequestions[key].question,
                            options: [response.thequestions[key].answer1, response.thequestions[key].answer2, response.thequestions[key].answer3, response.thequestions[key].answer4],
                            answer: parseInt(response.thequestions[key].correct),
                            source: response.thequestions[key].source,
                            linkWeb: response.thequestions[key].link,
                            text: response.thequestions[key].text,
                        }
                        quiz.push(questiontxt)
                    }
                    console.log(quiz)
                        //console.log(list[1])
                },
                error: function(response) {
                    alert(error)
                }
            })
            //},);
    })
</script>
const bless = document.getElementsByClassName('fa-dove')
const report = document.getElementsByClassName('fa-flag')


Array.from(bless).forEach(function (element) {
    element.addEventListener('click', function () {
        const gratitude = this.parentNode.parentNode.childNodes[3].innerText
        const peace = parseFloat(this.parentNode.parentNode.childNodes[10].innerText)
        console.log(gratitude)
        console.log(peace)

        fetch('/gratitudes', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'gratitude': gratitude,
                'peace': peace
            })
        })
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => {
                console.log(data)
                window.location.reload(true)
            })
    })
})

Array.from(report).forEach(function (element) {
    element.addEventListener('click', function () {
        const gratitude = this.parentNode.parentNode.childNodes[3].innerText
        const report = parseFloat(this.parentNode.parentNode.childNodes[14].innerText)
        console.log(gratitude)
        console.log(report)

        fetch('/gratitudesReport', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'gratitude': gratitude,
                'report': report
            })
        })
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => {
                console.log(data)
                window.location.reload(true)
            })
    })
})
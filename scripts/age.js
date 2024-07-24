(function () {
    "use strict";

    window.addEventListener('load', () => {
        document.getElementById("yearsEducator").innerHTML = getAge("2014/06/23")
        document.getElementById("age").innerHTML= getAge("1994/12/04")
    });

    function getAge(dateParam) {
        const today = new Date();
        const birthDate = new Date(dateParam);
        const m = today.getMonth() - birthDate.getMonth();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age
    }
})();

function ValidateEmail() {
    var inputText = document.form.text;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
        document.form.text.focus();
        return true;
    } else {
        alert("You have entered an invalid email address!");
        document.form.text.focus();
        return false;
    }
}
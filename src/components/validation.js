const validation = (values) => {

    let errors = {};

    if(!values.firstName){
        errors.firstName = "First Name is required";
    }

    if(!values.lastName){
        errors.lastName = "Last Name is required";
    }

    if(!values.phoneNumber){
        errors.phoneNumber = "Phone number is required"
    } else if(!/^[0-9]+$/.test(values.phoneNumber)){
        errors.phoneNumber = "Please only enter numeric characters"
    }

    if(!values.email){
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Email adress is invalid";
    }

    if(!values.password){
        errors.password = "Password is required";
    } else if (values.password.length < 6){
        errors.password = "Password needs to be 6 characters or more";
    }

    if(!values.password2){
        errors.password2 = "Password is required";
    } else if(values.password2 !== values.password){
        errors.password2 = "Passwords do not match"
    }

    return errors;
}

export default validation
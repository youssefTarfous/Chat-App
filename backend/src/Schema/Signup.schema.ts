const signupSchema = {
    email:{
        isString: {
            errorMessage: "Email must be a string"
        },
        isEmail: {
            errorMessage: "Email is not valid"
        },
        trim: true,
        notEmpty: {
            errorMessage: "Email is required"
        },
        isUnique: {
            errorMessage: "Email already exists"
        }
    },
    username:{
        isString: {
            errorMessage: "Username must be a string"
        },
        notEmpty: {
            errorMessage: "Username is required"
        },
        isLength:{
            options: { min: 3 },
            errorMessage: "Username must be at least 3 characters"
        },
        trim: true
    },
    password: {
        isString: {
            errorMessage: "Password must be a string"
        },
        trim: true,
        notEmpty: {
            errorMessage: "Password is required"
        },
        isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters"
        }
    },
}
export default signupSchema
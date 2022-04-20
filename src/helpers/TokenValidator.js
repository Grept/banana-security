import jwtDecode from "jwt-decode";

export default function tokenValidator(token) {
    const {exp} = jwtDecode(token);
    console.log("Validating token...")
    return ((new Date() / 1000) < exp);
}
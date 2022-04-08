import { Paper, Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import Country from './Country';

const Form = () => {
    const [country, setCountry] = useState('');
    const [userData, setUserData] = useState({});
    const [errors, setErrors] = useState({});
    const [usersValue, setUsersValue] = useState([]);
    const regexEmail =
        /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;

    const handleChange = (e) => {
        setUserData({
            ...userData,
            country,
            [e.target.name]: e.target.value,
        })
        console.log("useData", userData);
        setErrors({ ...errors, [e.target.name]: "" });
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log('form Submit......');
        // const { firstname, lastname, email, password, country, contact } = userData;
        console.log('formData ======>', userData);

        //Form Validation....     
        if (!userData.firstname || userData.firstname === "") {
            setErrors({
                ...errors,
                firstname: "Firstname must be required*"
            });
            // console.log('error =======>', errors.firstname);
        } else if (userData.firstname.length < 4) {
            setErrors({
                ...errors,
                firstname: "Firtname must be at least 4 char*"
            });
        } else if (!userData.lastname || userData.lastname === "") {
            setErrors({
                ...errors,
                lastname: "Lastname must be required*"
            });
        } else if (userData.lastname.length < 4) {
            setErrors({
                ...errors,
                lastname: "Lastname must be at least 4 char*"
            });
        } else if (!userData.email || userData.email === "") {
            setErrors({
                ...errors,
                email: "Email must be required*"
            });
        } else if (!userData.email || regexEmail.test(userData.email) === false) {
            setErrors({
                ...errors,
                email: "Email is not valid*"
            });
        } else if (!userData.password || userData.password === "") {
            setErrors({
                ...errors,
                password: "Password must be required*"
            });
        } else if (userData.password.length < 4) {
            setErrors({
                ...errors,
                password: "Password must be at least 4 char*"
            });
        } else if (!country || country === "") {
            setErrors({
                ...errors,
                country: "Country must be required*"
            });
        } else if (!userData.contact || userData.contact === "") {
            setErrors({
                ...errors,
                contact: "Contact must be required*"
            });
        } else {
            setUsersValue({ ...userData });
            // usersValue.push({
            //     ...userData
            // })
            console.log("usersValue =====> ", usersValue);
            setErrors({});
        }
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Form Demo</h1>
            <Paper>
                <Box px={3} py={2}>
                    <form style={{ textAlign: 'center' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="First Name"
                                    name="firstname"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                                <div style={{ color: 'red' }}>{errors.firstname}</div>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Last Name"
                                    name="lastname"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                                <div style={{ color: 'red' }}>{errors.lastname}</div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                                <div style={{ color: 'red' }}>{errors.email}</div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    name="password"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                                <div style={{ color: 'red' }}>{errors.password}</div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl sx={{ m: 1, width: 224, textAlign: 'left' }}>
                                    <InputLabel id="outlined-select-country-label">Country</InputLabel>
                                    <Select
                                        id="outlined-select-country"
                                        labelId="outlined-select-country-label"
                                        // select
                                        label="Country"
                                        name="country"
                                        variant="outlined"
                                        value={country}
                                        // onChange={() => { handleChange(); handleCountry(); }}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                        {Country.Country.map((item) => (
                                            <MenuItem key={item.Name} value={item.Name}>
                                                {item.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div style={{ color: 'red' }}>{errors.country}</div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="outlined-number"
                                    label="Contact"
                                    name="contact"
                                    type="number"
                                    // InputProps={{ inputProps: { min: "0", max: "9", step: "1" } }}
                                    variant="outlined"
                                    style={{ width: 224 }}
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                    }}
                                    onChange={handleChange}
                                // onChange={(e) => console.log(e.target.value)}
                                />
                                <div style={{ color: 'red' }}>{errors.contact}</div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button variant="contained" onClick={formSubmit}>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
            {
                // Object.keys(usersValue).map((item, index) => (
                <div>
                    {console.log('item : ', usersValue)}
                    <p>{usersValue.firstname}</p>
                    <p>{usersValue.lastname}</p>
                    <p>{usersValue.email}</p>
                    <p>{usersValue.password}</p>
                    <p>{usersValue.country}</p>
                    <p>{usersValue.contact}</p>
                </div>
                // ))
            }
        </>
    )
}

export default Form;

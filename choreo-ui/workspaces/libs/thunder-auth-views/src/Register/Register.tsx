import { Button, ButtonContainer, Card, CardContent, CardHeading, TextInput } from "@open-choreo/design-system";

export function Register() {
    return (
        <Card testId="register">
            <CardHeading title="Register Card" testId="register" />
            <CardContent>
                <TextInput
                    label="Username"
                    type="text"
                    placeholder="Enter your username"
                    testId="register-username"
                    value=""
                    onChange={function (text: string): void {
                        console.log(text);
                    }}
                />
                <TextInput
                    label="First Name"
                    type="text"
                    placeholder="Enter your first name"
                    testId="register-first-name"
                    value=""
                    onChange={function (text: string): void {
                        console.log(text);
                    }}
                />
                <TextInput
                    label="Last Name"
                    type="text"
                    placeholder="Enter your last name"
                    testId="register-last-name"
                    value=""
                    onChange={function (text: string): void {
                        console.log(text);
                    }}
                />
                <TextInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    testId="register-email"
                    value=""
                    onChange={function (text: string): void {
                        console.log(text);
                    }}
                />
                <TextInput
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    testId="register-password"
                    value=""
                    onChange={function (text: string): void {
                        console.log(text);
                    }}
                />
                <ButtonContainer testId="register-buttons" align="space-between">
                    <Button
                        variant="contained"
                        onClick={() => {
                            console.log('Register button clicked');
                        }}
                    >
                        Register
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            console.log('Cancel button clicked');
                        }}
                    >
                        Cancel
                    </Button>
                </ButtonContainer>
            </CardContent>
        </Card>
    )
}
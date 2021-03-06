import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        }
    }

    onbuttonPress() {

        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });

    }

    onLoginSuccess() {

        this.setState({
            loading: false,
            email: '',
            password: ''
        });

    }

    onLoginFail() {

        this.setState({
            error: 'Authentification Failed',
            loading: false
        });

    }

    renderButton() {

        if (this.state.loading) {
            return <Spinner size={'small'} />;
        } else {
            return (
                <Button onPress={this.onbuttonPress.bind(this)}>Login</Button>
            );
        }

    }

    render() {
        return (
            <Card>

                <CardSection>
                    <Input
                        label={'Email'}
                        placeholder={'falco@starfox.com'}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })} />
                </CardSection>

                <CardSection>
                    <Input
                        label={'Password'}
                        placeholder={'password'}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })} />
                </CardSection>

                <Text style={styles.errorTextStyle}>{this.state.error}</Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
};

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});

export default LoginForm;
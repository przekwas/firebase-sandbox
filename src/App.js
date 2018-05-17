import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null
        };
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyD4n3DGFxDlNjQaaCIZxML-8F_0oOxpKRM",
            authDomain: "auth-53009.firebaseapp.com",
            databaseURL: "https://auth-53009.firebaseio.com",
            projectId: "auth-53009",
            storageBucket: "auth-53009.appspot.com",
            messagingSenderId: "350816775461"
        });

        firebase.auth().onAuthStateChanged((user) => {

            if (user) {
                this.setState({ loggedIn: true })
            } else {
                this.setState({ loggedIn: false })
            }

        });

    }

    renderContent() {

        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;
            default:
                return (
                    <CardSection>
                        <Spinner size={"large"} />
                    </CardSection>
                );
        };

    }

    render() {
        return (
            <View>
                <Header title={'Authentication'} />
                {this.renderContent()}
            </View>
        );
    }
};

export default App;
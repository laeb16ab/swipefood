import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, Icon, Button } from 'react-native-elements';
import firebase from 'firebase';

export default class SwipeRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            indexKey: 0,
            indexLength: 0,
            recipeId: null,
            recipeLike: 0,
            checkedStarter: false,
            checkedMainCourse: true,
            checkedDessert: false,
            checkedMeat: false,
            checkedVegan: false,
            checkedVegetarian: false,
            checkedPescetar: false,
            checkedShellfish: false,
            checkedLaktose: false,
            checkedFish: false,
            checkedSoy: false,
            checkedWheat: false,
            checkedEgg: false,
            checkedNuts: false,
            checkedGluten: false,
            checkedVeggies: false,
            checkedPeanuts: false,

        }
    }
    static navigationOptions = {
        title: '',
    };

    componentWillMount() {
        this.getRecipeFromApiAsync();
        this.getProfile();
    }

    componentDidUpdate(indexKey) {

        if (this.state.indexKey !== this.state.indexKey) {
        }
    }

    getRecipeFromApiAsync() {
        var that = this;
        var mealkey = this.props.navigation.getParam('mealKey');

        firebase.database().ref(`opskrifter/${mealkey}`).on('value', function (snapshot) {
            var opskrifter = Object.values(snapshot.val());
            that.setState({
                isLoading: false,
                dataSource: opskrifter,
                indexLength: opskrifter.length
            });

        });
    }

    getProfile() {
        var that = this;
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/profile`).on('value', function (profile) {
            that.setState({
                checkedMeat: profile.val().Meateater,
                checkedVegan: profile.val().Vegan,
                checkedVegetarian: profile.val().Vegetarian,
                checkedPescetar: profile.val().Pescetar,
                checkedShellfish: profile.val().Shellfish,
                checkedLaktose: profile.val().Laktose,
                checkedFish: profile.val().Fish,
                checkedSoy: profile.val().Soy,
                checkedWheat: profile.val().Wheat,
                checkedEgg: profile.val().Egg,
                checkedNuts: profile.val().Nuts,
                checkedGluten: profile.val().Gluten,
                checkedVeggies: profile.val().Veggies,
                checkedPeanuts: profile.val().Peanuts
            });
        })
    }

    //Adds the recipe to the user in Firebase value true.
    likeRecipe() {
        var mealkey = this.props.navigation.getParam('mealKey');
        var index = this.state.indexKey;
        var indexName = this.state.dataSource[index].intro.id;
        console.log(this.state.indexLength)
        var ref = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/${mealkey}/${indexName}`)
        var obj = {
            value: true,
            name: indexName
        }
        ref.update(obj)
        this.updateLikes()
        index++
        this.setState({
            indexKey: index
        })
    }

    //Adds one like to the number of likes on the recipe in Firebase.
    updateLikes() {
        var mealkey = this.props.navigation.getParam('mealKey');
        var indexKey = this.state.indexKey;
        var likes = this.state.dataSource[indexKey].intro.likes;
        var indexName = this.state.dataSource[indexKey].intro.id;
        var newLikes = likes + 1;
        var ref = firebase.database().ref(`opskrifter/${mealkey}/${indexName}/intro/`);
        var obj = {
            likes: newLikes
        }
        ref.update(obj)
    }

    //Adds the recipe to the user in Firebase value false.
    dislikeRecipe() {
        var mealkey = this.props.navigation.getParam('mealKey');
        var index = this.state.indexKey;
        indexName = this.state.dataSource[index].intro.id
        var ref = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/${mealkey}/${indexName}`)
        var obj = {
            value: false
        }
        ref.update(obj)
        index++
        this.setState({
            indexKey: index
        })
    }

//Checks if there is a match in recipes and the profile, kostvaner and allergie. 
    render() {

        if (this.state.isLoading) {

            return <ActivityIndicator size='small' />
        } else {
    
        if (this.state.indexLength > this.state.indexKey) {
            if (this.state.checkedMeat === true && this.state.checkedMeat === this.state.dataSource[this.state.indexKey].diets.meateater || 
                this.state.checkedVegan === true && this.state.checkedVegan === this.state.dataSource[this.state.indexKey].diets.vegan ||
                this.state.checkedVegetarian === true && this.state.checkedVegetarian === this.state.dataSource[this.state.indexKey].diets.vegetarian ||
                this.state.checkedPescetar === true && this.state.checkedPescetar === this.state.dataSource[this.state.indexKey].diets.pescetar) {
                if(this.state.checkedGluten === true && this.state.checkedGluten !== this.state.dataSource[this.state.indexKey].allergies.gluten ||
                    this.state.checkedEgg === true && this.state.checkedEgg !== this.state.dataSource[this.state.indexKey].allergies.egg ||
                    this.state.checkedShellfish === true && this.state.checkedShellfish !== this.state.dataSource[this.state.indexKey].allergies.shellfish ||
                    this.state.checkedLaktose === true && this.state.checkedLaktose !== this.state.dataSource[this.state.indexKey].allergies.laktose ||
                    this.state.checkedNuts === true && this.state.checkedNuts !== this.state.dataSource[this.state.indexKey].allergies.nuts ||
                    this.state.checkedSoy === true && this.state.checkedSoy !== this.state.dataSource[this.state.indexKey].allergies.soy ||
                    this.state.checkedVeggies === true && this.state.checkedVeggies !== this.state.dataSource[this.state.indexKey].allergies.veggies ||
                    this.state.checkedWheat === true && this.state.checkedWheat !== this.state.dataSource[this.state.indexKey].allergies.wheat ||
                    this.state.checkedPeanuts === true && this.state.checkedPeanuts !== this.state.dataSource[this.state.indexKey].allergies.peanuts ||
                    this.state.checkedFish === true && this.state.checkedFish !== this.state.dataSource[this.state.indexKey].allergies.fish ||
                    this.state.checkedEgg === false &&  this.state.checkedFish === false &&  this.state.checkedGluten === false &&   this.state.checkedSoy === false &&
                    this.state.checkedLaktose === false &&  this.state.checkedNuts === false &&  this.state.checkedPeanuts === false &&  
                    this.state.checkedShellfish === false && this.state.checkedVeggies === false && this.state.checkedWheat === false) {
                    
                }else {
                var index = this.state.indexKey;
                index++
                this.setState({
                    indexKey: index
                })
            }
        
            } else {
                var index = this.state.indexKey;
                index++
                this.setState({
                    indexKey: index
                })
            }
        } else {
            alert("Der er desværre ikke flere opskrifter som matcher dine kostpræferencer")
            return (
                <View style={styles.sorryView}>

                    <Image
                        style={{ width: '100%', height: 200, alignContent: 'flex-start', justifyContent: 'flex-start' }}
                        source={{ uri: 'https://hiring-assets.careerbuilder.com/media/attachments/careerbuilder-ar_post-2800.jpg?1480533013' }} />
                </View>

            )
        }

        return (

            <ScrollView style={{ backgroundColor: 'white' }}>
                <View>
                    <View >
                        <Image style={{ width: '100%', height: 200, alignContent: 'flex-start', justifyContent: 'flex-start' }}
                            source={{ uri: this.state.dataSource[this.state.indexKey].intro.billede }} />

                    </View>
                    <View style={styles.childView}>
                        <View style={{ width: '78%' }}>
                            <Text style={styles.HeaderFont}>{this.state.dataSource[this.state.indexKey].intro.overskrift}</Text>
                        </View>
                        <View style={{ width: '22%' }}>
                            <View style={styles.childView}>
                                <Icon active name='timer' size={20} />
                                <Text>{this.state.dataSource[this.state.indexKey].intro.tid} min.</Text>
                            </View>
                            <View style={styles.childView}>
                                <Icon active name='group' size={20} />
                                <Text>{this.state.dataSource[this.state.indexKey].intro.personer} pers.</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.childView}>
                        <Text>{this.state.dataSource[this.state.indexKey].intro.underOverskrift}</Text>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <View style={styles.buttonView} />
                    <View style={styles.buttonContainer}>
                        <Icon
                            active name='clear'
                            size={50}
                            color='red'
                            onPress={() => this.dislikeRecipe()} />
                    </View>
                    <View style={{ width: 20 }} />
                    <View style={styles.buttonContainer}>
                        <Icon
                            active name='favorite'
                            size={50}
                            color='green'

                            onPress={() => this.likeRecipe()} />
                    </View>
                    <View style={styles.buttonView} />
                </View>
            </ScrollView>
        )
        }
    }


}
const styles = StyleSheet.create({
    childView: {
        flex: 1,
        flexDirection: 'row',
        padding: 2,
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,

    },
    sorryView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',

    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginLeft: 2,
        marginRight: 2,
    },
    buttonContainer: {

        flexDirection: 'row',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#f5f5f0'
    },
    HeaderFont: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    subHeaderFont: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        fontStyle: 'italic',
        fontFamily: 'BradleyHandITCTT-Bold'
    }
})
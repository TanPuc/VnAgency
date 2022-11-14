import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, TextInput } from "react-native";
import * as React from "react";
import { FlatList } from "react-native-gesture-handler";

const deviceHeight = Dimensions.get("window").height;

export class BottomPopup extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            show: false
        }
    }

    show = () => {
        this.setState({show:true})
    }

    close = () => {
        this.setState({show:false})
    }

    renderOutsideTouchable(onTouch){
        const view = <View style = {{flex: 1, width: '100%'}}/>

        if(!onTouch) return view

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return (
            <View>
                <Text
                    style = {{
                        color: '#182E44',
                        fontSize: 25,
                        fontWeight:'bold',
                        marginTop: 15,
                        marginBottom: 30,
                        backgroundColor: 'transparent',
                    }}>
                        {title}
                    </Text>
            </View>
        )
    }

    renderInput = () => {
        return (
            <View>
                <TextInput
                    style={{
                        height: 50, 
                        margin: 12, 
                        marginTop: 0,
                        borderWidth: 1, 
                        padding: 10,  
                        shadowColor: '#171717',
                        shadowOffset: {width: -2, height: 4}, 
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        borderRadius: 5,
                        color: '#182E44',
                    }}
                    value={Number}  
                    placeholder="Nhập chi phí của bạn"
                    placeholderTextColor={'#182E44'}
                    autoFocus={true}
                />
            </View>
        )
    }

    renderContent = () => {
        const {data} = this.props
        return (
            <View>
                <FlatList
                    style={{marginBottom: 20}}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={this.renderItem}
                    extraData={data}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    contentContainerStyle={{
                        paddingBottom: 40
                    }}>
                </FlatList>
            </View>
        )
    }

    renderItem = ({item}) => {
        return (
            <View style={{height:50, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18, fontWeight:'normal', color: '#182E44'}}>{item.name}</Text>
            </View>
        )
    }

    renderSeparator = () => {
        <View
            style={{
                opacity: 0.1,
                backgroundColor: '#182E44',
                height: 1,
            }}

        ></View>
    }

    render() {
        let {show} = this.state
        const {onTouchOutside, title} = this.props 

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: '#000000AA',
                    justifyContent: 'flex-end'
                }}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        width: '100%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        paddingHorizontal: 10,
                        // maxHeight: deviceHeight * 0.9,
                        height: '90%',
                    }}>
                        {this.renderTitle()}
                        {this.renderInput()}
                        {this.renderContent()}
                    </View>

                </View>
            </Modal>
        )
    }
}
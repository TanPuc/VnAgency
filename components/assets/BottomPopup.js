import { Modal, Dimensions, Button, TouchableWithoutFeedback, StyleSheet, View, Text, TextInput, TouchableOpacity} from "react-native";
import * as React from "react";
import { FlatList } from "react-native-gesture-handler";
import MARKERS from "../Main_Screen/config/MARKERS";

const deviceHeight = Dimensions.get("window").height;

function max(a, b) {
    return (a > b ? a : b);
}

function knapsack(W) {
    const n = Object.keys(MARKERS).length - 1;
    var dp = new Array(n + 1), val = new Array(n + 1), wt = new Array(n + 1);
    for(var i=0;i<=n;i++) dp[i] = new Array(n + 1);

    for(var i=1;i<=n;i++) {
        wt[i] = MARKERS[i].id * 10000 - MARKERS[i].rate * 10000;
        val[i] = MARKERS[i].id * 75000 - 378;
    }

    for(var i=0;i<=n;i++) {
        for(var w=0;w<=W;w++){
            if(i == 0 || w == 0) dp[i][w] = 0;
            else if(wt[i - 1] <= w) {
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            }
            else dp[i][w] = dp[i-1][w];
        }
    }

    var w = W, res = dp[n][W];
    var trace = new Array(0);
    for(var i=n;i>0 && res>0;i--) {
        if(res == dp[i-1][w]) continue;
        else {
            trace.push(MARKERS[i-1].title);
            res = res - val[i - 1];
            w = w - wt[i - 1];
        }
    }

    trace.reverse();

    console.log(trace);
}

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
                {/* <FlatList
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
                </FlatList> */}
                <Button
                  style={{
                    alignSelf: "center",
                    backgroundColor: "#71bc7c",
                    justifyContent: "center",
                    alignItems: "center",
                    top: '20%',
                    width: '40%',
                    height: '20%',
                  }}
                  title="Kết quả"
                  onPress={knapsack(800000)}
                >
                    {/* <Text>Kết quả</Text> */}
                </Button>
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
                        height: '60%',
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
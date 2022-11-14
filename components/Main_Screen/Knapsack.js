import { View, Text } from 'react-native'
import React from 'react'
import MARKERS from './config/MARKERS'

function Item(id, cost, rate, dist) {
    this.id = id;
    this.cost = cost;
    this.rate = rate;
    this.dist = dist;
}

const Knapsack = () => {
    var a = new Array(500);
    for(var i=0;i<=500;i++) {
        a[i] = new Array(500);
    }
    for(var i=0;i<=50;i++) {
        for(var w=0;w<=W;w++){
            
            if(i == 0 || w == 0) {
                a[i][w] = 0;
            }
            else if(MARKERS[i].price) {

            }
        }
    }
    return (
      <View>
        <Text>Knapsack</Text>
      </View>
    )
}

export default Knapsack
import { View, Text } from 'react-native'
import React from 'react'
import MARKERS from './config/MARKERS'

function Item(id, cost, rate, dist) {
    this.id = id;
    this.cost = cost;
    this.rate = rate;
    this.dist = dist;
}

const Knapsack = (W) => {
    var dp = new Array(500);
    for(var i=0;i<=500;i++) dp[i] = new Array(500);
    for(var i=0;i<=50;i++) {
        for(var w=0;w<=W;w++){
            if(i == 0 || w == 0) dp[i][w] = 0;
            else if(MARKERS[i].price <= W) {
                dp[i][w] = max(MARKERS[i].rate + dp[i - 1][w - MARKERS[i - 1].price], dp[i - 1][w]);
            }
            else dp[i][w] = dp[i-1][w];
        }
    }
    return (
      <View>
        <Text>Knapsack</Text>
      </View>
    )
}

export default Knapsack
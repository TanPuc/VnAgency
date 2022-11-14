import { View, Text } from 'react-native'
import React from 'react'
import MARKERS from './MARKERS'

const Knapsack = ({ W = 50000 }) => {
    var dp = new Array(500), val = new Array(500), wt = new Array(500);
    for(var i=0;i<=500;i++) dp[i] = new Array(500);
    for(var i=0;i<=MARKERS.length();i++) {
        val[i] = MARKERS[i].id * 10000 - MARKERS[i].rate * 10000;
        wt[i] = MARKERS[i].dist * 75000;
    }
    for(var i=0;i<=50;i++) {
        for(var w=0;w<=W;w++){
            if(i == 0 || w == 0) dp[i][w] = 0;
            else if(wt[i] <= W) {
                dp[i][w] = max(val[i] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            }
            else dp[i][w] = dp[i-1][w];
        }
    }

    var w = W, res = dp[50][W];
    var trace = new Array(500);
    for(var i=50;i>0 && res>0;i--) {
        if(res == dp[i-1][W]) continue;
        else {
            trace.push(i - 1);
            res = res - val[i - 1];
            w = w - wt[i - 1];
        }
    }

    return trace;
}

export default Knapsack
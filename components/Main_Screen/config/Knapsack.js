import { View, Text } from 'react-native'
import React from 'react'
import MARKERS from './MARKERS'

function max(a, b) {
    return (a > b ? a : b);
}

const Knapsack = ({W}) => {
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
            // console.log(i - 1);
            trace.push(i - 1);
            res = res - val[i - 1];
            w = w - wt[i - 1];
        }
    }

    trace.reverse();

    return trace;
}

export default Knapsack
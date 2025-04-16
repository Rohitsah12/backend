#include<bits/stdc++.h>
#include<ext/pb_ds/assoc_container.hpp>
#include<ext/pb_ds/tree_policy.hpp>
using namespace std;

#define int long long
#define endl '\n'

const int MOD=1e9+7;
const int INF=LLONG_MAX>>1;
using namespace __gnu_pbds;
typedef tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> pbds; // find_by_order, order_of_key
void solve(){
    int n;
    cin>>n;
    vector<char>ch;
    for(int i=0;i<n;i++){
        cin>>ch[i];
    }
    int acount=0;
    int gacount=0;
    int agacount=0;
    for(int i=n-1;i>=0;i--){
        if(ch[i]=='a'){
            acount++;
            agacount+=gacount;
        }
        if(ch[i]=='g') gacount+=acount;
    }
    cout<<agacount;
}
signed main(){
ios_base::sync_with_stdio(false);
cin.tie(NULL);
    int t=1;
    // int t;
    // cin>>t;
    while(t--){
        solve();
    }
}
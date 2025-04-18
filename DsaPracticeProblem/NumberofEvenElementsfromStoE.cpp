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
    vector<int>v(n);
    for(int i=0;i<n;i++){
        cin>>v[i];
        if(v[i]%2==0) v[i]=1;
        else v[i]=0; 
    }
    for(int i=1;i<n;i++){
        v[i]+=v[i-1];
    }
    int q;
    cin>>q;
    while(q--){
        int s;int e;
        cin>>s>>e;
        if(s==0) cout<<v[e]<<endl;
        else cout<<v[e]-v[s-1]<<endl;
    }

    
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
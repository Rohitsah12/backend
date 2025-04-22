#include<bits/stdc++.h>

using namespace std;
#define int long long
#define endl '\n'
const int MOD=1e9+7;
const int INF=LLONG_MAX>>1;

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
    
    while(t--){
        solve();
    }
}
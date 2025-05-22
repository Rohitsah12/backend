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
    int n,k; cin>>n>>k;
    int x,a,b,c;
    cin>>x>>a>>b>>c;
    vector<int>v(n);
    v[0]=x;
    for(int i=1;i<n;i++){
         v[i] = (a * v[i - 1] + b) % c;
    }
    deque<int>q;
    int xv=0;
    for(int i=0;i<k;i++){
        while (!q.empty() && v[q.back()] > v[i]) {
            q.pop_back();
        }
        q.push_back(i);

    }
    xv^=v[q.front()];
    for(int i=k;i<n;i++){
        while (!q.empty() && q.front() <= i - k) {
            q.pop_front();
        }

        while (!q.empty() && v[q.back()] > v[i]) {
            q.pop_back();
        }
        q.push_back(i);
        xv^=v[q.front()];
        
    }
    cout<<xv;
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
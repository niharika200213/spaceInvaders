#include <iostream>
#include <iterator>

using namespace std;

int main()
{
    char *s = "wow";

    s[0] = 'j';

    for( auto value: s )
    {
        cout<<value<<endl;
    }
}
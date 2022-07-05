const api_call = 'https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000'


export async function getAllAssets() {
    try {
        const response = await fetch(api_call, {
            method: 'GET',
            headers: {
                "x-multifarm-host": "api.multifarm.fi",
                "x-multifarm-key": "apikey"
            }
        });
        return await response.json();
    } catch (error) {
        return []

    }
}
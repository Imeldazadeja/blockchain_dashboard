const base_url = 'https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000';


export async function getAllAssets() {
    try {
        const response = await fetch(base_url, {
            method: 'GET',
        });
        let data = await response.text();
        // API contains Infinity values that are not supported in JSON
        let cleanData = data.replace(/Infinity/g, '"null"');
        return JSON.parse(cleanData);
    } catch (error) {
        throw error
    }
}
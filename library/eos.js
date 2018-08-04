const _httpEndpoint = 'https://api.eosnewyork.io';

const donation_account = 'accountlecko';

export default {
	take: function(cb_success, cb_fail) {
		const httpEndpoint = `https://api.instasun.me/api/hackathon/keepit`;

		return fetch(httpEndpoint, {
			method: 'POST'
		})
		.then((response) => {
			console.log(response);
			if (typeof cb_success === 'function') {
				return cb_success();
			}
		})
		.catch((err) => {
			if (typeof cb_fail === 'function') {
				return cb_fail(err);
			} else {
				throw new Error(err);
			}
		});
	},
	donate: function(cb_success, cb_fail) {
		const httpEndpoint = `https://api.instasun.me/api/hackathon/donate`;

		return fetch(httpEndpoint, {
			method: 'POST'
		})
		.then((response) => {
			if (typeof cb_success === 'function') {
				return cb_success();
			}
		})
		.catch((err) => {
			if (typeof cb_fail === 'function') {
				return cb_fail(err);
			} else {
				throw new Error(err);
			}
		});
	},

	getBalance: function(account_name, cb_success, cb_fail) {
		const httpEndpoint = `${_httpEndpoint}/v1/chain/get_table_rows`;

		return fetch(httpEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code: 'leckoaccount',
				table: 'accounts',
				scope: account_name,
				json: true
			})
		})
		.then((response) => {
			return response.json();
		})
		.then((responseJson) => {
			if (typeof cb_success === 'function') {
				return cb_success(responseJson && responseJson.rows && responseJson.rows.length > 0 ? responseJson.rows[0].balance : '0.0000 WIZ');
			}
		})
		.catch((err) => {
			console.log(err);
			if (typeof cb_fail === 'function') {
				return cb_fail(err);
			} else {
				throw new Error(err);
			}
		});
	},
	getAccountHistory: function(account_name, cb_success, cb_fail) {
		const httpEndpoint = `https://api.eostracker.io/accounts/${'leckoaccount'}/actions`;

		return fetch(httpEndpoint)
			.then((response) => response.json())
			.then((responseJson) => {
				const res = [];

				if (typeof cb_success === 'function') {
					for(var i in responseJson) {
						if(responseJson[i]['name'] == 'transfer' && (responseJson[i]['data']['to'] == account_name || responseJson[i]['data']['to'] == donation_account)) {
							res.push(responseJson[i]);
						}
					}

					return cb_success(res);
				}
			})
			.catch((err) => {
				if (typeof cb_fail === 'function') {
					return cb_fail(err);
				} else {
					throw new Error(err);
				}
			});
	}
};
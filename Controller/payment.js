const request = require('request');

class Payment {
    constructor() {
        // تنظیمات مربوط به درگاه بانکی
        this.bankMerchantId = 'YourBankMerchantId';
        this.bankCallbackUrl = 'http://your-domain.com/payment/callback/bank';
        
        // تنظیمات مربوط به زرین پال
        this.zarinpalMerchantId = 'YourZarinpalMerchantId';
        this.zarinpalCallbackUrl = 'http://your-domain.com/payment/callback/zarinpal';
    }

    // تابع برای پرداخت از طریق درگاه بانکی
    payWithBank(amount, callback) {
        // ارسال درخواست به درگاه بانکی
        // اینجا باید درخواست خود را برای درگاه بانکی ارسال کنید و پس از آن، به callback فراخوانی شده پاسخ دریافتی را بررسی کنید.
        // برای این مثال، از درخواست به عنوان مثال استفاده شده است.
        request.post('BankPaymentApiUrl', {
            json: {
                merchantId: this.bankMerchantId,
                amount: amount,
                callbackUrl: this.bankCallbackUrl
            }
        }, (error, response, body) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, body);
        });
    }

    // تابع برای پرداخت از طریق زرین پال
    payWithZarinpal(amount, callback) {
        // ارسال درخواست به زرین پال
        // اینجا باید درخواست خود را برای زرین پال ارسال کنید و پس از آن، به callback فراخوانی شده پاسخ دریافتی را بررسی کنید.
        // برای این مثال، از درخواست به عنوان مثال استفاده شده است.
        request.post('ZarinpalPaymentApiUrl', {
            json: {
                merchantId: this.zarinpalMerchantId,
                amount: amount,
                callbackUrl: this.zarinpalCallbackUrl
            }
        }, (error, response, body) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, body);
        });
    }
}

module.exports = Payment;
class Payment {
    constructor() {
        // تنظیمات مربوط به درگاه بانکی
        this.bankMerchantId = 'YourBankMerchantId';
        this.bankCallbackUrl = 'http://your-domain.com/payment/callback/bank';
        
        // تنظیمات مربوط به زرین پال
        this.zarinpalMerchantId = 'YourZarinpalMerchantId';
        this.zarinpalCallbackUrl = 'http://your-domain.com/payment/callback/zarinpal';
    }

    // تابع برای پرداخت از طریق درگاه بانکی
    payWithBank(amount, callback) {
        request.post('BankPaymentApiUrl', {
            json: {
                merchantId: this.bankMerchantId,
                amount: amount,
                callbackUrl: this.bankCallbackUrl
            }
        }, (error, response, body) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, body);
        });
    }

    // تابع برای پرداخت از طریق زرین پال
    payWithZarinpal(amount, callback) {
        request.post('ZarinpalPaymentApiUrl', {
            json: {
                merchantId: this.zarinpalMerchantId,
                amount: amount,
                callbackUrl: this.zarinpalCallbackUrl
            }
        }, (error, response, body) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, body);
        });
    }
}

const payment = new Payment();

// مسیر برای پرداخت از طریق درگاه بانکی
app.get('/pay/bank', (req, res) => {
    const amount = req.query.amount;
    payment.payWithBank(amount, (error, response) => {
        if (error) {
            return res.status(500).send('خطا در پرداخت از طریق درگاه بانکی.');
        }
        // ارسال کاربر به صفحه درگاه بانکی برای انجام پرداخت
        res.redirect(response.paymentUrl);
    });
});

// مسیر برای پرداخت از طریق زرین پال
app.get('/pay/zarinpal', (req, res) => {
    const amount = req.query.amount;
    payment.payWithZarinpal(amount, (error, response) => {
        if (error) {
            return res.status(500).send('خطا در پرداخت از طریق زرین پال.');
        }
        // ارسال کاربر به صفحه زرین پال برای انجام پرداخت
        res.redirect(response.paymentUrl);
    });
});

// مسیر برای درخواست بازگشت از پرداخت
app.post('/payment/callback/bank', (req, res) => {
    // پرداخت از طریق درگاه بانکی با موفقیت انجام شده است
    // اینجا باید اطلاعات پرداخت را بررسی کرده و عملیات مربوطه را انجام دهید
    res.send('پرداخت از طریق درگاه بانکی با موفقیت انجام شد.');
});

app.post('/payment/callback/zarinpal', (req, res) => {
    // پرداخت از طریق زرین پال با موفقیت انجام شده است
    // اینجا باید اطلاعات پرداخت را بررسی کرده و عملیات مربوطه را انجام دهید
    res.send('پرداخت از طریق زرین پال با موفقیت انجام شد.');
});

app.listen(port, () => {
    console.log(`سرور در حال اجرا در پورت ${port}`);
});

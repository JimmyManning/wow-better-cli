// test.js
'use strict';
const fs = require('fs');

const chai = require('chai');
const assert = chai.assert;
const should = chai.should();

const IsNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const testTimeout = 20*1000;

describe('Curse', function() {
    const curse = require('../lib/curse.js');
    describe('getDownloadUrl()', function() {

        it('should return the download url of an addon', function(done) {
            this.timeout(testTimeout)
            curse.getDownloadURL('Ace3', null, (err, url, version) => {
                should.not.exist(err);
                should.exist(url);
                should.exist(version);
                const zipRegex = /\.zip/;
                let hasZip = zipRegex.exec(url);

                should.not.equal(null, hasZip);
                should.not.equal(null, version);

                IsNumeric(version).should.equal(true);
                done()
            }) 
        })
    })
});

describe('downloader', function() {
    const curse = require('../lib/curse.js');
    const downloader = require('../lib/downloader.js');
    describe('downloadAddonToTempFile()', function() {
        it('should download the zip of an addon', function(done) {
            this.timeout(testTimeout);
            curse.getDownloadURL('Ace3', null, (err, url, version) => {
                downloader.downloadAddonToTempFile(url, (err, path) => {
                    should.not.exist(err);
                    should.exist(path);
                    fs.access(path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
                        should.not.exist(err);
                        done();
                    });
                })
            }) 
        })
    })
});

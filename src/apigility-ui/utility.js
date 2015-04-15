if (typeof String.prototype.endsWith !== 'function') {
  String.prototype.endsWith = function(s) {
    return this.length >= s.length && this.substr(this.length - s.length) == s;
  };
}

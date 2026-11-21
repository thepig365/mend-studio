// Offline QR generation with macOS Core Image; no network or added dependency.
import AppKit
import CoreImage
import Foundation

let payload = "https://mendbeauty.com.au/feedback"
let output = CommandLine.arguments.dropFirst().first ?? "public/qr/mend-feedback-qr.png"
guard let filter = CIFilter(name: "CIQRCodeGenerator") else { fatalError("QR generator unavailable") }
filter.setValue(Data(payload.utf8), forKey: "inputMessage")
filter.setValue("Q", forKey: "inputCorrectionLevel")
guard let qr = filter.outputImage else { fatalError("QR generation failed") }
let modules = Int(qr.extent.width)
let scale = Int(960 / (modules + 8)) // At least four blank modules on every side.
let edge = (modules + 8) * scale
let context = CGContext(data: nil, width: 1200, height: 1500, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
context.setFillColor(CGColor(gray: 1, alpha: 1))
context.fill(CGRect(x: 0, y: 0, width: 1200, height: 1500))
context.interpolationQuality = .none
let pixels = CIContext().createCGImage(qr, from: qr.extent)!
context.draw(pixels, in: CGRect(x: (1200 - edge) / 2 + 4 * scale, y: 300 + 4 * scale, width: modules * scale, height: modules * scale))
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(cgContext: context, flipped: false)
func text(_ value: String, y: CGFloat, size: CGFloat, weight: NSFont.Weight = .regular) {
  let paragraph = NSMutableParagraphStyle()
  paragraph.alignment = .center
  let attributes: [NSAttributedString.Key: Any] = [.font: NSFont.systemFont(ofSize: size, weight: weight), .foregroundColor: NSColor.black, .paragraphStyle: paragraph]
  (value as NSString).draw(in: NSRect(x: 60, y: y, width: 1080, height: 80), withAttributes: attributes)
}
text("MEND Beauty Studio", y: 1350, size: 64, weight: .semibold)
text("Customer feedback · 顾客反馈", y: 1265, size: 42)
text("Scan to share your experience", y: 200, size: 38)
text("扫码填写反馈 · English / 中文", y: 140, size: 38)
text("mendbeauty.com.au/feedback", y: 55, size: 35)
NSGraphicsContext.restoreGraphicsState()
let png = NSBitmapImageRep(cgImage: context.makeImage()!).representation(using: .png, properties: [:])!
try png.write(to: URL(fileURLWithPath: output), options: .atomic)
print("\(output): \(payload), \(modules) modules, \(scale) px/module")

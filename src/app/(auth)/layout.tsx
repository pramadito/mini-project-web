import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			{/* -mt-24 for now */}
			{children}
			<Toaster />
		</div>
	);
}
